require('dotenv').config()
const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secureConnection: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            tls: {
                secureProtocol: 'TLSv1_method'
            }
        })
    }

    async sendActivationLink(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Account activation",
            text: "",
            html: `
                <div>
                    <h1>Please verify your email address</h1>
                    <a href="${link}">Verify Email</a>
                </div>
            `
        })
    }
}

module.exports = new MailService()