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

// Automatically parse json to object
app.use(express.json())

// Setup routes
const router = new express.Router()
app.use(userRouter)
app.use(taskRouter)

// Exports the app
module.exports = app