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

## MonogoDB Server

To run the mondodb server on your machine once it has been installed, run the following command to start the server when testing on the localhost
```
mongodb/bin/mongod.exe --dbpath=D:\mongodb-database
```

## HTTP Requests

For this tutorial we make us of [POSTMAN](https://www.postman.com/) to make http requests. While this is not for handling requests on the client side, it allows us to test the API without having to create a client.

## HTTP Status

We can find a list of all the possible HTPP statues at [httpstatuses](https://httpstatuses.com/).

## Password Hashing

In order to keep passwords securely stored on the database, this application makes use of [bcryptjs](https://www.npmjs.com/package/bcrypt) to hash user passwords.

## JSON Webtoken (JWT)

This application uses [jsonwebtokens](https://www.npmjs.com/package/jsonwebtoken) to serve tokens to users once they have logged in.

## File Uploads

This application uses [multer](https://www.npmjs.com/package/multer) to upload binary data to the db. We also use [sharp](https://www.npmjs.com/package/sharp) to format images uploaded to the server

## Emails

To send emails this application uses the [sendgrid](https://sendgrid.com/) service.

## Environment Variables

The [env-cmd](https://www.npmjs.com/package/env-cmd) module is used to load in environment variables to safely store API keys.

## Production MongoDB Service

This applicaiton hosts a mongoDB database on [atlas]([https://www.mongodb.com/cloud/atlas) and [mongodb atlas](https://www.mongodb.com/cloud/atlas) has been used for dev access.