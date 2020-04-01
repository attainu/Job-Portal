
const JobDetails = require("../models/Job");
const JobProviderDetails = require("../models/JobProvider");
const JobSeekerDetails = require("../models/JobSeeker");
const AdminDetails = require("../models/Admin");
const jwt = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs")
const Joi = require("@hapi/joi");
const { sendMailToUser, forgotPasswordMailing } = require("../utils/nodeMailer")


function jobProviderJobsIncrement(totalPosted) {
  return totalPosted += 1
}

module.exports = {

  // ----------------------Posting a Job by Job-Provider-----------------------
  async postingJob(req, res) {
    try {
      const job = await new JobDetails({ ...req.body })
      console.log("job1", job)
      job.jobProviderId = req.jobProvider._id;
      job.jobProviderEmail = req.jobProvider.email;
      job.jobProviderName = req.jobProvider.name;
      job.save();
      const user = await JobProviderDetails.findById(req.jobProvider._id)
      console.log(user)
      const totalPosted = jobProviderJobsIncrement(user.totalPosted);
      await JobProviderDetails.findOneAndUpdate({ id: req.jobProvider._id }, { totalPosted: totalPosted })
      console.log("job posted successfully");
      res.status(202).send("job posted successfully");
    }
    catch (error) {
      return res.status(500).send(error.message)
    }
  },

  // --------------------------User Registration------------------------
  async userRegister(req, res) {
    try {
      const { name, email, password, aadhaarNumber, contactNumber, address } = req.body
      const Schemavalidation = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().min(3).max(8).required(),
        aadhaarNumber: Joi.number().min(100000000000).max(999999999999).required(),
        contactNumber: Joi.number().min(1000000000).max(9999999999).required(),
        address: Joi.string().min(10).max(100).required(),
      })
      const { error, result } = Schemavalidation.validate({ name: name, email: email, password: password, aadhaarNumber: aadhaarNumber, contactNumber: contactNumber, address: address })
      if (error) return res.status(422).json({ Error: error.message })


      if (req.body.role == "Job-Provider") { var schema = JobProviderDetails; var userType = "Job-Provider" }
      if (req.body.role == "Job-Seeker") { var schema = JobSeekerDetails; var userType = "Job-Seeker" }

      const activationToken = await jwt.sign({ id: Math.random() }, process.env.TEMP_TOKEN_SECRET, { expiresIn: 1000 * 1000 * 60 })
      const user = await new schema({ ...req.body });
      const hashedPassword = await hash(req.body.password, 10);
      user.password = hashedPassword;
      user.activationToken = activationToken;
      user.save()
      sendMailToUser(`${userType}`, req.body.email, activationToken);
      res.status(202).send(`${userType} account registered Successfully`);
    }
    catch (err) {
      if (err.name === "SequelizeValidationError")
        return res.status(400).send(`Validation Error: ${err.message}`);
    }
  },

  // -------------------------------User Login---------------------
  async userLogin(req, res) {
    try {
      var email = req.body.email;
      var password = req.body.password;
      if (!email || !password)
        return res.status(400).send("Incorrect credentials");

      if (req.body.role == "Job-Provider")var schema = JobProviderDetails;
      if (req.body.role == "Job-Seeker") var schema = JobSeekerDetails;
      if (req.body.role == "Admin") var schema = AdminDetails;

      const user = await schema.findOne({ email });
      if (!user) return res.status(400).send("Incorrect credentials");
      const isMatched = compare(password, user.password);
      if (!isMatched) throw new Error("Invalid credentials");
      if (!user.isVerified) return res.status(401).send("You are not verified, please activate link sent to you through Email");
      if(user.isBlocked)  return res.status(401).send(`${user.name}, you are blocked for the misuse of SeasonalEmployment.com.....`);

      console.log(user)
      const token = await jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1000 * 600 * 100 })
      user.jwt = token;
      user.save()
      return res.status(202).send({ token })
    }
    catch (err) {
      return res.status(500).send(err.message)
    }
  },

  // --------------------------- Forgot Password to send OTP -------------------------
  async forgotPassword(req, res) {
    try {
      if (req.body.role == "Job-Provider") schema = JobProviderDetails;
      if (req.body.role == "Job-Seeker") schema = JobSeekerDetails;
      if (!req.body.role) return res.send("Incorrect Credentials")
      const user = await schema.findOne({ email: req.body.email, aadhaarNumber: req.body.aadhaarNumber, isVerified: true });
      console.log(user)
      if (!user) return res.send("Incorrect Credentials or kindly activate your account by visiting the link that has been sent to you")
      if(user.isBlocked)  return res.status(401).send(`${user.name}, you are blocked for the misuse of SeasonalEmployment.com.....`);
      const rawPassword = (Math.floor(Math.random() * 100000000)).toString();
      const hashedPassword = await hash(rawPassword, 10)
      user.password = hashedPassword;
      user.save();
      forgotPasswordMailing(req.body.email, rawPassword)
      return res.status(202).send("A system generated password has been sent to your email successfully. Login with that password and edit your password in profile section")
    } catch (err) {
      return res.status(500).send(err.message)
    }
  }
}































