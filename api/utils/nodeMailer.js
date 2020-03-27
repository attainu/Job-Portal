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

function isAcceptedMailToProvider(emailProvider,title,postedOn,seekerName) {
    transport.sendMail({
        from: process.env.GMAIL,
        to: emailProvider,
        subject: `Congratulations you have got a helping hand` ,
        html: `Your Posted Job - ${title} posted on ${postedOn}has been accepted by ${seekerName}. We believe you will get good service from ${seekerName} and also you will definitely pay your helper decently. Please visit your profile to view the additonal details of the JobSeeker.
        Stay-Connected & Get-helped`,
    }).then((response) => {
        console.log(response);
    }).catch((err) => console.log(err.message))
}

function isAcceptedMailToSeeker(emailSeeker,title,postedOn,providerName) {
    transport.sendMail({
        from: process.env.GMAIL,
        to: emailSeeker,
        subject: `Congratulations you have got an Opportunity to utilize your precious leisure time and skill` ,
        html: `You Accepted Job - ${title} posted on ${postedOn} from Provider ${providerName}. We believe you will give your best and honest service to ${providerName} and for that you will get rightly paid. Please visit your profile to view the additonal details of the Job.
        Stay-Connected & Get-helped`,
    }).then((response) => {
        console.log(response);
    }).catch((err) => console.log(err.message))
}


module.exports={sendMailToUser, isAcceptedMailToProvider, isAcceptedMailToSeeker};