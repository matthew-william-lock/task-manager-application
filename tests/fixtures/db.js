const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = mongoose.Types.ObjectId()
const userOne = {
    _id:userOneId,
    name:"Mike",
    email:"mike@gmail.com",
    password:"MyPAss1231",
    tokens:[{
        token:jwt.sign({
            _id:userOneId
        },process.env.JSON_WEBTOKEN_SECRET)
    }]
}

const userTwoId = mongoose.Types.ObjectId()
const userTwo = {
    _id:userTwoId,
    name:"Matthew",
    email:"matthew@gmail.com",
    password:"MyPAss1231134!@",
    tokens:[{
        token:jwt.sign({
            _id:userTwoId
        },process.env.JSON_WEBTOKEN_SECRET)
    }]
}

const taskOneId = new mongoose.Types.ObjectId()
const taskTwoId = new mongoose.Types.ObjectId()
const taskThreeId = new mongoose.Types.ObjectId()

const taskOne = {
    _id: taskOneId,
    description:"First task",
    completed:false,
    userId:userOneId._id
}

const taskTwo = {
    _id: taskTwoId,
    description:"Second task",
    completed:true,
    userId:userOneId._id
}

const taskThree = {
    _id: taskThreeId,
    description:"Third task",
    completed:true,
    userId:userTwoId._id
}

const setUpDatabase = async ()=> {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwo,
    setUpDatabase,
    taskOneId,
    taskTwoId,
    taskThreeId
}