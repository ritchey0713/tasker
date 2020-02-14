const secretKey = require("./secrets")
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(secretKey)

