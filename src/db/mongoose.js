const mongoose = require('mongoose')
const validate = require('validator')

const databaseName = process.env.DATABASE_NAME
const connectionURL = process.env.DATABASE_URL+databaseName

mongoose.connect(connectionURL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then((response)=>{
    console.log("Connected!")
}).catch((error)=>{
    console.log(error)
})
