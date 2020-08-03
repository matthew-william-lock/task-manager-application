const request = require('supertest')

const app = require('../src/app')
const User = require('../src/models/user')

const {userOneId,userOne,setUpDatabase} = require('./fixtures/db')

// Clear database before test suite runs
// Uses lifecycle methods
beforeEach(setUpDatabase)

test('Should sign up new user',async ()=>{
    const response = await request(app).post('/users').send({
        name:"Matthew",
        email:"example@gmail.com",
        password:"MyPAss1231"
    }).expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    // expect(response.body.user.name).toBe('Matthew')
    expect(response.body).toMatchObject({
        user:{
            name:"Matthew",
            email:"example@gmail.com",
        },
        token: user.tokens[0].token
    })
    
    expect(user.password).not.toBe("MyPAss1231")
})

test('Existing User Login',async ()=>{
    const response = await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(response.body.token).toBe(user.tokens[1].token)

})

test('Bad Credential Login',async ()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password+'a'
    }).expect(400)
})

test('Read Profile',async ()=>{
    await request(app)
        .get('/users/me')
        .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Non Authorized Read Profile',async ()=>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Authorized Account Deletion',async ()=>{
    const response = await request(app)
        .delete('/users/me')
        .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
    
})

test('Non Authorized Read Profile',async ()=>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
    
})

test("Authorized Upload Avatar Ipload", async() =>{
    await request(app)
        .post('/users/me/avatar')
        .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
        .attach('upload','tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test("Authorized User Update", async() =>{
    await request(app)
        .patch('/users/me')
        .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
        .send({
            name:"Updated named"
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toBe("Updated named")
})

test("Authorized Failed User Update", async() =>{

    await request(app)
        .patch('/users/me')
        .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
        .send({
            born:2010
        })
        .expect(400)
})