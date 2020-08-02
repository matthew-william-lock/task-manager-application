# Task Managaer Application

This application was created in my journey of learning Node.js and backend development. The purpose of the application is to allow users to track the status of tasks that they set for themselves. Features of the application include user:
- User login
- User creation
- Security features:
    - User authentification
    - Password hashing
- File upload (for profile picture)
- Automatic email notifications.

some of the tools users to create this application have been listed below.

## MonogoDB Server

To run the mondodb server on your machine once it has been installed, run the following command to start the server
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

This applicaiton hosts a mongoDB database on (atlas)[https://www.mongodb.com/cloud/atlas] and (mongodb atlas)[https://www.mongodb.com/cloud/atlas] has been used for dev access.