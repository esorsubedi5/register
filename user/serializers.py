from rest_framework import serializers
from phonenumber_field.serializerfields import PhoneNumberField
from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import gettext_lazy as _

UserModel = get_user_model()

class CustomPhoneNumberField(PhoneNumberField):
    def to_representation(self, value):
        """
        Convert PhoneNumber to string using PHONENUMBER_DEFAULT_FORMAT.
        """
        return str(value)

class UserRegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration with additional confirmation fields.
    """

    mobile = CustomPhoneNumberField()
    confirm_email = serializers.EmailField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = UserModel
        fields = ['username', 'email', 'confirm_email', 'mobile', 'first_name', 'last_name', 'password', 'confirm_password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        """
        Validate that email and password confirmation fields match.
        """
        # Check if email and confirm_email match
        if data['email'] != data['confirm_email']:
            raise serializers.ValidationError("Emails do not match.")
        
        # Check if password and confirm_password match
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")

        return data

    def create(self, validated_data):
        """
        Create a new user after validating confirmation fields.
        """
        # Pop the confirmation fields before creating the user
        confirm_email = validated_data.pop('confirm_email', None)
        confirm_password = validated_data.pop('confirm_password', None)

        # Check if email and password match their confirmation fields
        if validated_data['email'] != confirm_email:
            raise serializers.ValidationError("Emails do not match.")
        
        if validated_data['password'] != confirm_password:
            raise serializers.ValidationError("Passwords do not match.")

        # Create the user
        password = validated_data.pop('password')
        return UserModel.objects.create_user(password=password, **validated_data)


class UserLoginSerializer(serializers.Serializer):
    """
    Serializer for user login with username or email.
    """

    username = serializers.CharField(max_length=150, required=True)
    password = serializers.CharField(
        label=_("Password"),
        style={'input_type': 'password'},
        trim_whitespace=False,
        required=True
    )

    def validate(self, attrs):
        """
        Validate user credentials during login.
        """
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            if '@' in username:
                email = username
                try:
                    user = UserModel.objects.get(email=email)
                except UserModel.DoesNotExist:
                    user = None
            else:
                user = authenticate(request=self.context.get('request'), username=username, password=password)

            if user:
                attrs['user'] = user
            else:
                msg = _('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Must include "username" and "password".')
            raise serializers.ValidationError(msg, code='authorization')

        return attrs

class UserViewSerializer(serializers.ModelSerializer):
    """
    Serializer for user details view.
    """

    mobile = CustomPhoneNumberField()

    class Meta:
        model = UserModel
        fields = ['id', 'username', 'email', 'mobile', 'first_name', 'last_name']
