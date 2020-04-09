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


function sendMailToUser(user,email,activationToken) {
    transport.sendMail({
        from: process.env.GMAIL,
        to: email,
        subject: `One time email verification is needed to get yourself Registrated with SeasonalJobs.com`,
        html: `We are almost done with registration process. Click on this link to activate your account https://seasonal-jobs.herokuapp.com/api/accountactivation/${activationToken}?user=${user}`,
    }).then((response) => {
        console.log(response);
    }).catch((err) => console.log(err.message))
}

function isAcceptedMailToProvider(emailProvider,title,postedOn,seekerName) {
    transport.sendMail({
        from: process.env.GMAIL,
        to: emailProvider,
        subject: `Congratulations you have got a helping hand` ,
        html: `Your Posted Job - ${title} posted on ${postedOn}has been accepted by ${seekerName}. We believe you will get good service from ${seekerName} and also we are sure that you will definitely pay your helper decently. Please visit your profile to view the additonal details of the JobSeeker.
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
        html: `You Accepted Job - ${title} posted on ${postedOn} from Provider ${providerName}. We believe you will give your best and honest service to ${providerName} and for that you will get rightly paid. Please visit your profile to view the additonal details of the Job. We also believe, you won't let us down.
        Stay-Connected & Get-helped`,
    }).then((response) => {
        console.log(response);
    }).catch((err) => console.log(err.message))
}

function forgotPasswordMailing(email,password) {
    transport.sendMail({
        from: process.env.GMAIL,
        to: email,
        subject: `System generated password for logging In on SeasonalEmployment.com`,
        html: `<p>This password is system generated password to login into your account on <b>SeasonalEmployment.com</b>. Please Login and change your password in profile section.</p>
        <h3>Password: ${password}. Your Privacy is our utmost concern.`
    }).then((response) => {
        console.log(response);
    }).catch((err) => console.log(err.message))
}

module.exports={sendMailToUser, isAcceptedMailToProvider, isAcceptedMailToSeeker, forgotPasswordMailing};