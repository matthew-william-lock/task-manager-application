// Import mail provider
const sgMail = require('@sendgrid/mail')

const apiKey = process.env.SENDGRID_API_KEY

// Set API key
sgMail.setApiKey(apiKey)

// sgMail.send({
//     to:'mtthew.lock@gmail.com',
//     from:'mtthew.lock@gmail.com',
//     subject:'My second email!',
//     text:'Hehe xd'
// })

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to:email,
        from:'mtthew.lock@gmail.com',
        subject:'Welcome to our Task Manager Application!',
        text:`Welcome to the app, ${name}. Let us know how you get along with the app!`,
        // html:"html here"
    })
}

const sendCancelationEmail = (email, name) =>{
    sgMail.send({
        to:email,
        from:'mtthew.lock@gmail.com',
        subject:'Goodbye from the Task Manager Application...',
        text:`Goodbye ${name} :( We're sad to see you leave but we'd love any feedback you might have!`,
        // html:"html here"
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}