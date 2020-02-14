const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'ritchey0713@gmail.com',
    subject: "Thanks for signing up!",
    text: `Hey there ${name}! Thanks for signing up, let me know how you like the application!`,
    // html: `<header>Hey there ${name}!</header><br/><p>Thanks for signing up, let me know how you like the application!</p>`
  })
}

const cancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "ritchey0713@gmail.com",
    subject: "Sorry to see you leave us",
    text: `Hey ${name}, I'm sorry you have cancelled your account, is there anything we can do to bring you back in the future? Have a wonderful day!`
  })
}

module.exports = {
  sendWelcomeEmail,
  cancelEmail
}