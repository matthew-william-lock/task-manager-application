# Task Managaer Application

This application was created in my journey of learning Node.js and backend development. The purpose of the application is to allow users to track the status of tasks that they set for themselves. Features of the application include user:
- User login
- User creation
- Security features:
    - User authentification
    - Password hashing
- File upload (for profile picture)
- Automatic email notifications.

The **environmental variables** needed for the functioning of this application are:
- PORT
- SENDGRID_API_KEY
- JSON_WEBTOKEN_SECRET
- DATABASE_URL
- DATABASE_NAME

## Interacting
 
As mentioned previously there are numerous ways that the user can interact with the application. All interactions are achieved through htpp endpoints. All interactions are documented below

### Create New User

``POST`` : https://hexdro-task-manager.herokuapp.com/users
 <br/>Body: 
```
{
    "name":"Full name",
    "age":20
    "email":"example@gmail.com",
    "password":"1234567"
}
```
*The password must contain at least 7 characters and cannot contain 'password'*
- **This will return a JSON web token that needs to be used when performing all other operations other than login.**

### User Login

``POST`` : https://hexdro-task-manager.herokuapp.com/users/login
 <br/>Body: 
```
{
    "name":"Full name",
    "password":"1234567"
}
```
- **This will return a JSON web token that needs to be used when performing all other operations other than login.**
- Automatically sends welcome email to user

### User Logout

``POST`` : https://hexdro-task-manager.herokuapp.com/users/logout
 <br/>auth: This requires a bearer token provided when creating a new user, or logging into the user
- Removes current token from list of tokens that can be used to access user data

### User Logout of All Sessions

``POST`` : https://hexdro-task-manager.herokuapp.com/users/logout
 <br/>auth: This requires a bearer token provided when creating a new user, or logging into the user
- Removes all tokens from list of tokens that can be used to access user data
- User will have to login again after this to recieve new token

### Upload Avatar

``POST`` : https://hexdro-task-manager.herokuapp.com/users/me/avatar
 <br/>auth: This requires a bearer token provided when creating a new user, or logging into the user
 <br/>body : {
```
    "key":"upload",
    "value":avatar.jpg
}
```
- Allows user to upload image to database to be used as the user's profile picture
- Uploading an avatar will overwrite the current avatar
- The image must be a jpg,jpeg or png
- The image cannot be larger than 1 MB

### Delete User

``DELETE`` : https://hexdro-task-manager.herokuapp.com/users/me
 <br/>auth: This requires a bearer token provided when creating a new user, or logging into the user
- Deletes specified user data, and all tasks associated with user from the database
- **BREAKS RULE OF ONLY ALLOWING USERS TO INTERACT WITH THEIR OWN DATA**
- **Kept in production for learning oppertunities**
- Automatically sends goodbye email to user

### Delete User (By ID)

``DELETE`` : https://hexdro-task-manager.herokuapp.com/users/insert_user_id_here
 <br/>auth: This requires a bearer token provided when creating a new user, or logging into the user
- Deletes user data, and all tasks associated with user from the database

### Delete Avatar

``DELETE`` : https://hexdro-task-manager.herokuapp.com/users/me/avatar
 <br/>auth: This requires a bearer token provided when creating a new user, or logging into the user
- Removes user avatar from the database

### Read Profile

``GET`` : https://hexdro-task-manager.herokuapp.com/users/me
 <br/>auth: This requires a bearer token provided when creating a new user, or logging into the user
- Returns user information of the user currently logged in
- Purposefully omits information like password, login tokens

### Read All Users

``GET`` : https://hexdro-task-manager.herokuapp.com/users
 <br/>auth: This requires a bearer token provided when creating a new user, or logging into the user
- Returns  user information of all users stored on the database
- Purposefully omits information like password, login tokens
- **BREAKS RULE OF ONLY ALLOWING USERS TO INTERACT WITH THEIR OWN DATA**
- **Kept in production for learning oppertunities**

### Update User

``PATCH`` : https://hexdro-task-manager.herokuapp.com/users/me
 <br/>auth: This requires a bearer token provided when creating a new user, or logging into the user
 <br/>body:
```
{
    name":"New name",
    "age":20
    "email":"new_email@gmail.com",
    "password":"1234567"
}
```
- Updates information of the user currently logged in
- Password can be sent to datebase as plain text but will be hahed before saving

### Create Task

``POST`` : https://hexdro-task-manager.herokuapp.com/tasks
 <br/>auth: This requires a bearer token provided when creating a new user, or logging into the user
 <br/>Body: 
```
{    
    "description":"Wash the windows",
    "completed":false
}
```
- Creates a task associated with user currently logged in
- ``completed`` set to false by default unless specified as completed in BODY of http request

### Read Tasks

``GET`` : https://hexdro-task-manager.herokuapp.com/tasks?sortBy=completed:desc
 <br/>auth: This requires a bearer token provided when creating a new user, or logging into the user
- Returns all tasks associated with user currently logged in
- Allows user to sort by completed ( ``desc`` or ``asc``)

### Read Single Task

``GET`` : https://hexdro-task-manager.herokuapp.com/tasks/inset_task_id_here
 <br/>auth: This requires a bearer token provided when creating a new user, or logging into the user
- Returns task specified as long as it is associated with user currently logged in

### Update Task

``PATCH`` : https://hexdro-task-manager.herokuapp.com/tasks/inset_task_id_here
 <br/>auth: This requires a bearer token provided when creating a new user, or logging into the user
 <br/>body:
```
{
    "description":"Updated!",
    completed:"true"
}
```
- Updates information of specified task, provided it is associated with user currently logged in

### Delete Task

``PATCH`` : https://hexdro-task-manager.herokuapp.com/tasks/inset_task_id_here
 <br/>auth: This requires a bearer token provided when creating a new user, or logging into the user
 <br/>body:
- Deletes specified task, provided it is associated with user currently logged in

---

## Tools User

Some of the tools users to create this application have been listed below.

## Heroku
[Heroku](https://www.heroku.com/) is a tool we can use to deploy node application, and is the tool that has been used to deplot this simple Weather Application. 

### Deploting the Server
We need to install the [cli tools](https://devcenter.heroku.com/articles/heroku-cli) to deploy the application to a live server.

Once Heroku has been installed we can login use the following command to login to the Heroku service from your terminal:
```
heroku login
```

We can then setup an SSH connection with Heroku with the following command:
```
heroku keys:add
```
*If you are told there is no existing SSH Key, type **Y** to let Heroku create one*

The next step is to create the Heroku application using the command listed below. This will provide us with two URLs. The first being the project link on Heroku, and the second being a github link where we should upload our source code for hosting on the Heroku services.
```
heroku create application_here
```

In order to serve the application with environmental variables, we need to set the environmental variables for the Heroku app. This can be achieved with the following commands.
```
heroku config:set key=value
```
where key is the environmental variable and value is its value.

To see the current environmental variable simply run:
```
heroku config
```

### MonogoDB Server

To run the mondodb server on your machine once it has been installed, run the following command to start the server when testing on the localhost
```
mongodb/bin/mongod.exe --dbpath=D:\mongodb-database
```

### HTTP Requests

For this tutorial we make us of [POSTMAN](https://www.postman.com/) to make http requests. While this is not for handling requests on the client side, it allows us to test the API without having to create a client.

### HTTP Status

We can find a list of all the possible HTPP statues at [httpstatuses](https://httpstatuses.com/).

### Password Hashing

In order to keep passwords securely stored on the database, this application makes use of [bcryptjs](https://www.npmjs.com/package/bcrypt) to hash user passwords.

### JSON Webtoken (JWT)

This application uses [jsonwebtokens](https://www.npmjs.com/package/jsonwebtoken) to serve tokens to users once they have logged in.

### File Uploads

This application uses [multer](https://www.npmjs.com/package/multer) to upload binary data to the db. We also use [sharp](https://www.npmjs.com/package/sharp) to format images uploaded to the server

### Emails

To send emails this application uses the [sendgrid](https://sendgrid.com/) service.

### Environment Variables

The [env-cmd](https://www.npmjs.com/package/env-cmd) module is used to load in environment variables to safely store API keys.

### Production MongoDB Service

This applicaiton hosts a mongoDB database on [atlas]([https://www.mongodb.com/cloud/atlas) and [mongodb atlas](https://www.mongodb.com/cloud/atlas) has been used for dev access.