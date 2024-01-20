## This project is created by <a href="https://www.linkedin.com/in/ishworsubedi/" target="_blank">Ishwor Subedi</a>
 
# Django Register App with Token-Based Authorization

This DRF project, named "register," provides a robust solution for user registration, login, 
and authentication using Django Rest Framework (DRF). 
The project utilizes a custom user model, `CustomUser`, which extends the Django 
`AbstractUser` model and includes additional fields such as a mobile number. 
Token-based authentication ensures secure user authentication, 
and the project is structured to support seamless integration into any 
Django-based application.

The project is intregated with `React.js` librabry for user-friendly and to leverage for Single Page Application (SPA) capabilities, optimizing the overall user experience.
And it communicates with a Django back-end that provides various API endpoints for user-related actions.
## Features

- User registration
- User login/logout
- User profile management

## Project Components

### 1. Project Settings (`settings.py`)
The main settings file includes configurations such as database settings, 
authentication classes, middleware, CORS settings, and installed apps. 
Environment variables are used for sensitive information such as the secret key 
and database credentials.

### 2. Root URL Configuration (`urls.py`)
The root URL configuration routes requests to different views, 
including Django admin, user-related APIs, and a schema view. 
This provides a clear and organized structure for handling various functionalities 
within the application.

### 3. User App (`user`)
The `user` app is the core of the project, encompassing models, 
serializers, views, URLs, and admin configurations.

#### 3.1. User Model (`models.py`)
The `CustomUser` model introduces additional fields to the standard Django 
user model, enhancing user data storage with features like a mobile number.

#### 3.2. User Serializers (`serializers.py`)
Serializers for user registration, login, and view are provided, 
offering a clean and consistent way to validate and process user data. 
The serializers also include logic for email and password confirmation.

#### 3.3. User Views (`views.py`)
API views for user registration, login, details, update, deletion, 
and logout are implemented. 
Token authentication ensures secure access to these endpoints, 
making them suitable for integration into a frontend application.

#### 3.4. User URLs (`urls.py`)
URL patterns for user-related views are defined, 
facilitating the organization and accessibility of different user functionalities.

#### 3.5. User Admin Configuration (`admin.py`)
Custom admin configurations for the `CustomUser` model enhance the 
user management experience within the Django admin panel.
## Prerequisites

- [Python](https://www.python.org/downloads/) (>=3.8)
- [Django](https://www.djangoproject.com/) (==4.2.9)
- [python-dotenv](https://pypi.org/project/python-dotenv/) (==1.0.0)
- [Django REST framework](https://www.django-rest-framework.org/) (==3.14.0)
- [django-easy-audit](https://pypi.org/project/django-easy-audit/) (==1.3.5)
- [django-cors-headers](https://pypi.org/project/django-cors-headers/) (==4.2.9)
- [Node.js](https://nodejs.org/) (>=21.5.0)
- [npm](https://www.npmjs.com/) (>=10.3.0) or [Yarn](https://yarnpkg.com/) (>=1.22.x)
- [React](https://reactjs.org/) (>=18.2.0)
- [React Router DOM](https://reactrouter.com/web/guides/quick-start) (>=6.21.2)
- [Axios](https://axios-http.com/) (>=1.6.5)
- [React Bootstrap](https://react-bootstrap.github.io/) (>=2.9.2)

### Optional
## This for someone to use my repository
> ⚠️ **Warning:** This Github repo doesnot have `settings.py` file.
## Clone the repository
```bash
    git clone https://github.com/esorsubedi5/register
```
## How to Run the Project
1. Setup your prefered environment. For this project its `venv`
```bash
pip install virtualenv
```
```bash
# On Windows
virtualenv venv
```
```bash
# On Windows
venv\Scripts\activate
```
```bash
# On macOS/Linux
source venv/bin/activate
```
2. Install the requirements:
### Django
```bash
pip install -r djangorequirements.txt
```
```plaintext
asgiref==3.7.2
attrs==23.2.0
beautifulsoup4==4.12.2
Django==4.2.9
django-cors-headers==4.3.1
django-easy-audit==1.3.5
djangorestframework==3.14.0
psycopg2-binary==2.9.9
python-dotenv==1.0.0
pytz==2023.3.post1
soupsieve==2.5
sqlparse==0.4.4
typing_extensions==4.9.0
tzdata==2023.4
```
### React.js
I prefer installing and running react in my local environment which is `venv`
```bash
(venv) PS your-path-to-app\register\registration-app>npx create-react-app registration-app
```
```bash
npx create-react-app registration-app
```
Navigate to react app folder.
```bash
cd registration-app
```
`requirements`
```plaintext
node==v21.5.0
npm==10.3.0
@testing-library/jest-dom==5.17.0
@testing-library/react==13.4.0
@testing-library/user-event==13.5.0
axios==1.6.5
bootstrap==5.3.2
react==18.2.0
react-bootstrap==2.9.2
react-dom==18.2.0
react-router-dom==6.21.2
react-scripts==5.0.1
web-vitals==2.1.4
```
In your `package.json` edit these packages
```json
"name": "registration-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.6.5",
    "bootstrap": "^5.3.2",
    "react": "^18.2.0",
    "react-bootstrap": "^2.9.2",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.2",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
```
and apply this command
```bash
npm install
```
This will install the specified versions of the dependencies 
listed in your `package.json` file.

If you prefer using `yarn`, you can replace `npm install` with 
```bash
yarn install.
```

2. Ensure `Django` and other dependencies are installed.
```bash
pip install django djangorestframework
```
3. Create a django Project and app
```bash
django-admin startproject register
```
Navigate the project.
```bash
cd register
```
4. Create app
```bash
python manage.py startapp user
```
5. Set up `environment` variables, including `SECRET_KEY`, `HOST`, `ALLOWED_HOSTS`,
and database-related variables.
create `.env` file using following commands
This file must be in folder and same path as `manage.py`
`Windows`
```bash
New-Item -ItemType File -Name .env
```
`Linux and MacOS`
```bash
touch .env
```
Install `dotenv` to read `key-value` from `.env` file. 

`dotenv()` installation is required
```bash
pip install python-dotenv
```
 And change following things in `settings.py` settings sort of like this:
```python
import os
from dotenv import load_dotenv
load_dotenv()
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('HOST')

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')

# Remove any leading or trailing whitespaces from the items in the list
ALLOWED_HOSTS = [host.strip() for host in ALLOWED_HOSTS]


# Application definition

INSTALLED_APPS = [
    # Add these apps
    'rest_framework',
    'user',
    'rest_framework.authtoken',
    'easyaudit',
    'corsheaders',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}
MIDDLEWARE = [
    #Add these Middleware
    'corsheaders.middleware.CorsMiddleware',
    'easyaudit.middleware.easyaudit.EasyAuditMiddleware',
]
# This Database settings if for postgresql
DATABASES = {
    'default':{
        'ENGINE': os.getenv('DB_ENGINE'),
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT'),
    }
}
CSRF_COOKIE_SECURE = True
CSRF_USE_SESSIONS = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React app development server
]

# Set this to True during development to allow cookies with cross-origin requests
CORS_ALLOW_CREDENTIALS = True
```
Copy the example `.env` example file to a new file named `.env` 
and fill in the required values:
```bash
SECRET_KEY=your_secret_key
HOST=your_host
ALLOWED_HOSTS=localhost,example.com
DB_ENGINE=your_db_engine
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
```

This is sample demo my `.env` is not exactly this;
```env
SECRET_KEY='django-insecure-21nsad*&()ukjs^%$##'
DEBUG=True
#host
ALLOWED_HOSTS=localhost,127.0.0.1
# database
# for postgresql
DB_ENGINE=django.db.backends.postgresql  
# Give your database a name
DB_NAME= register
# your pgadmin username
DB_USER= Github
#your pgadmin password
DB_PASSWORD=12345657689  
DB_HOST=localhost  
DB_PORT=5432 

#for dbsqlite
DB_ENGINE=django.db.backends.sqlite3
# Set the name of your SQLite database file
DB_NAME=db.sqlite3
```
6. Run `migrations`:
```bash
python manage.py makemigrations
```
```bash
python manage.py migrate
```
7. Create a superuser:
```bash
python manage.py createsuperuser
```
8. Run the development server: 
```bash
python manage.py runserver
```
9. Access the `admin` panel at `http://localhost:8000/admin/` and use the DRF browsable API for user-related operations.

## API Endpoints

- **User Registration:** `POST /api/register/`
- **User Login:** `POST /api/login/`
- **User Details:** `GET /api/user/`
- **Update User:** `PUT /api/user/`
- **Delete User:** `DELETE /api/user/delete/`
- **User Logout:** `POST /api/logout/`
## Django Folder Structure
The project has a clean and organized folder structure to help you navigate through the Django app:
- **`register/`**: The root django project folder.
- **`registration-app/`**: The root react-app folder.
- **`user/`**: The django app.
- **`.env`**: ENV file for all enviroment variables storage.
- **`.gitignore`**: text document for all files and folders ignored to stage, commit and push to github.
- **`manage.py`**:  interface to interact with Django's management commands, facilitating common development and administrative tasks. 
###  10 .Start React APP
## make sure django server is running 
`python manage.py runserver`
Run this in react app folder
``` bash
(venv) your-path-to-the-project\register\registration-app> npm start
```
```bash
npm start
``` 
## React Folder Structure
The project has a clean and organized folder structure to help you navigate through the React app:
- **`src/`**: Contains the source code for the React app.
  - **`components/`**: Houses individual React components.
  - **`App.js`**: Serves as the main application component.


## Contributing
Feel free to contribute to this project! Open an issue or submit a pull request


Feel free to explore and integrate these endpoints into your frontend application. 
This project provides a solid foundation for user authentication 
in Django applications, emphasizing security and flexibility.
