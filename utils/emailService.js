import nodemailer from 'nodemailer'
import { config } from '../config'

exports.sendEmail = (toEmail, subject, text, callback) => {
    let transporter = nodemailer.createTransport({
        service: config.EMAIL_SERVICE,
        auth: {
            user: config.EMAIL_USERNAME,
            pass: config.EMAIL_PASSWORD
        }
    })
      
    let mailOptions = {
        from: config.EMAIL_USERNAME,
        to: toEmail,
        subject: subject,
        text: text
    }
      
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            callback(err)
        } else {
            callback(null, 'email sent')
        }
    })
} 