const nodemailer = require('nodemailer')


const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD
    }
})

transport.verify().then((res) => console.log(res))


function sendMailToUser(user,email,tempToken) {
    transport.sendMail({
        from: process.env.GMAIL,
        to: email,
        subject: 'Email verification required for authenticating your Registration on SeasonalEmployment.com',
        html: `Click on this link to activate your account https://localhost:8080/api/${user}accountactivation/${tempToken}`,
    }).then((response) => {
        console.log(response);
    }).catch((err) => console.log(err.message))
}

module.exports=sendMailToUser;