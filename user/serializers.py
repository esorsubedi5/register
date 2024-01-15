import json
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from phonenumber_field.serializerfields import PhoneNumberField
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()

class CustomPhoneNumberField(PhoneNumberField):
    def to_representation(self, value):
        # Convert PhoneNumber to string using PHONENUMBER_DEFAULT_FORMAT
        return str(value)

class UserRegisterSerializer(serializers.ModelSerializer):
    mobile = CustomPhoneNumberField()
    class Meta:
        model = UserModel
        fields = ['username', 'email', 'mobile', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        return UserModel.objects.create_user(password = password, **validated_data)

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150, required = True)
    password = serializers.CharField(
        label=_("Password"),
        style={'input_type': 'password'},
        trim_whitespace=False,
        required=True
    )
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            if '@' in username:
                email = username
                try:
                    user =UserModel.objects.get(email=email)
                except UserModel.DoesNotExist :
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
    mobile = CustomPhoneNumberField()

    class Meta:
        model = UserModel
        fields = ['id', 'username', 'email', 'mobile', 'first_name', 'last_name']
