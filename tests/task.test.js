const request = require('supertest')

const app = require('../src/app')
const Task = require('../src/models/task')

const {userOneId,userOne,userTwo,setUpDatabase,taskOneId,taskTwoId,taskThreeId} = require('./fixtures/db')

// Clear database before test suite runs
// Uses lifecycle methods
beforeEach(setUpDatabase)

test('Authorized Task Creation',async ()=>{
    const response = await request(app)
        .post('/tasks')
        .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
        .send({
            description:"From my test"
        }).expect(201)
    
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})

test('Authorized Read Tasks',async ()=>{
    const response = await request(app)
        .get('/tasks')
        .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
        .send().expect(200)
    expect(response.body.length).toEqual(2)
    expect(response.body[0]._id).toBe(taskOneId.toHexString())
    expect(response.body[1]._id).toBe(taskTwoId.toHexString())
    

})

test('Unauthorized Delete Tasks',async ()=>{
    const response = await request(app)
        .delete(`/tasks/${taskThreeId}`)
        .set("Authorization",`Bearer ${userTwo.tokens[0].token}`)
        .send().expect(200)   
        
    const task = await Task.findById(taskThreeId._id)
    expect(task).toBeNull()

})

test('Unauthorized Delete Tasks',async ()=>{
    const response = await request(app)
        .delete(`/tasks/${taskOneId}`)
        .set("Authorization",`Bearer ${userTwo.tokens[0].token}`)
        .send().expect(404)    

    const task = await Task.findById(taskOneId._id)
    expect(task).not.toBeNull()

})