const express = require('express')
const mongoose = require('mongoose')

// Connect to db
require('./db/mongoose')

// import routers
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

// Load Models
const User = require('./models/user')
const Task = require('./models/task')

// Setup the server
const app = express()
const port = process.env.PORT

// Automatically parse json to object
app.use(express.json())

// Setup routes
const router = new express.Router()
app.use(userRouter)
app.use(taskRouter)

// Start server
app.listen(port,()=>{
    console.log("Server is up on port "+port+" :")
})