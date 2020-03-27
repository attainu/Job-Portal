const JobDetail = require("../models/Job");
const JobProviderDetail = require("../models/JobProvider");
const JobSeekerDetail = require("../models/jobSeeker");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const { sendMailToUser } = require("../utils/nodeMailer")
const cloudinary = require("../utils/cloudinary")
const convertBufferToString = require("../utils/convertBufferToString")

function jobProviderJobsIncrement(totalPosted) {
  return totalPosted += 1
}

module.exports = {
  postingJob: function (req, res) {
    const { category, duration, title, description, preferedSkills, preference, rateOfPayment, timeSlot, keyword, contactNumber, city, pincode, address } = req.body
    const Schemavalidation = Joi.object({
      category: Joi.string().required(),
      duration: Joi.number().min(1).required(),
      title: Joi.string().min(3).max(40).required(),
      description: Joi.string().min(10).max(300).required(),
      preferedSkills: Joi.string().min(3).max(100).required(),
      preference: Joi.string().min(3).max(40).required(),
      rateOfPayment: Joi.number().min(1).max(50000).required(),
      timeSlot: Joi.string().required(),
      keyword: Joi.string().min(3).required(),
      contactNumber: Joi.number().min(10).max(12),
      city: Joi.string().min(3).max(20),
      pincode: Joi.number().required(),
      address: Joi.string().min(15).max(100).required()

    })
    const { error, result } = Schemavalidation.validate({ category: category, duration: duration, title: title, description: description, preferedSkills: preferedSkills, preference: preference, rateOfPayment: rateOfPayment, timeSlot: timeSlot, keyword: keyword, contactNumber: contactNumber, city: city, pincode: pincode, address: address })
    if (error) return res.status(422).json({ Error: error.message })
    console.log(result)
    const jobdetail = new JobDetail({ ...req.body, jobProviderId: req.jobProvider._id, jobProviderEmail: req.email, jobProviderName: req.name });
    jobdetail
      .save()
      .then(() => {
        JobProviderDetail.findById(req.jobProvider._id).then((jobProvider) => jobProviderJobsIncrement(jobProvider.totalPosted)).then((totalPosted) => {
          JobProviderDetail.findByIdAndUpdate(req.jobProvider._id, { totalPosted: totalPosted }
          ).then(() => console.log("no. of jobs posted by job provider", totalPosted))
        })
        console.log("job posted successfully");
        res.status(200).json(jobdetail);
      })
      .catch(err => {
        console.log("POSTING JOBS ====== ", err.message);
        return res.status(403).send(err.message);
      });
  },
  userRegister: function (req, res) {
    const { name, email, password, aadhaarNumber, contactNumber, address, profilePicture, role } = req.body
    const Schemavalidation = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().min(3).max(8).required(),
      aadhaarNumber: Joi.number().required(),
      contactNumber: Joi.number().required(),
      address: Joi.string().min(10).max(50).required(),
    })
    const { error, result } = Schemavalidation.validate({ name: name, email: email, password: password, aadhaarNumber: aadhaarNumber, contactNumber: contactNumber, address: address })
    if (error) return res.status(422).json({ Error: error.message })
    console.log(result)
    if (req.body.role == "Job-Provider") {
      const tempJwt = jwt.sign({ id: Math.random() }, process.env.TEMP_TOKEN_SECRET)
      const jobProviderDetail = new JobProviderDetail({ ...req.body, tempJwt: tempJwt });
      jobProviderDetail
        .save()
        .then(() => {
          sendMailToUser("provider", req.body.email, tempJwt);
          console.log("Provider registered Successfully");
          res.status(200).json(jobProviderDetail);
        })
        .catch(err => {
          console.log(err.message);
          return res.status(403).send(err.message);
        });
    } else if (req.body.role == "Job-Seeker") {
      const tempJwt = jwt.sign({ id: Math.random() }, process.env.TEMP_TOKEN_SECRET)
      const jobSeekerDetail = new JobSeekerDetail({ ...req.body, tempJwt: tempJwt });
      jobSeekerDetail
        .save()
        .then(() => {
          sendMailToUser("seeker", req.body.email, tempJwt);
          console.log("Seeker Registered Successfully");
          res.status(200).json(jobSeekerDetail);
        })
        .catch(err => {
          console.log(err.message);
          return res.status(403).send(err.message);
        });
    }
  },

  userLogin: function (req, res) {
    if (req.body.role == "Job-Provider") {
      var email = req.body.email;
      var password = req.body.password;
      if (!email || !password)
        return res.status(400).send("Incorrect credentials");
      JobProviderDetail.findByEmailAndPassword(email, password)
        .then(function (user) {
          if (!user.isVerified) return res.status(404).send("job provider not verified, please activate link sent to u through email")
          jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1000 * 60 * 10 }, function (err, token) {
            if (err) {
              console.log(err.message);
              return res.status(500).send("Server Error");
            }
            user.jwt = token;
            req.jwt = token
            user.save()

            console.log(user)
            res.status(200).send(user);
          });
        })
        .catch(function (err) {
          console.log(err.message);
          res.status(403).send("Login Failed");
        });
    }
    else {
      var email = req.body.email;
      var password = req.body.password;
      if (!email || !password)
        return res.status(400).send("Incorrect credentials");
      JobSeekerDetail.findByEmailAndPassword(email, password)
        .then(function (user) {
          if (!user.isVerified) return res.send("job seeker not verified, please activate link sent to u through email")
          jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 6000 * 60 * 1 }, function (err, token) {
            if (err) {
              console.log(err.message);
              return res.status(500).send("Server Error");
            }
            user.jwt = token;
            req.jwt = token
            user.save()
            console.log(user)
            res.status(200).send(user);
          });
        })
        .catch(function (err) {
          console.log(err.message);
          res.status(403).send("Login Failed");
        });
    }
  },
  uploadProviderProfilePicture:function(req,res){
    let imageContent = convertBufferToString(req.file.originalname,req.file.buffer)
    cloudinary.uploader.upload(imageContent).then(function(imageResponse){
      console.log("imageResponse = ",imageResponse)
      console.log("imageUrl=",imageResponse.url)
      console.log("req.jobProvider._id=",req.jobProvider._id)
      JobProviderDetail.findByIdAndUpdate(req.jobProvider._id,{profilePicture:imageResponse.secure_url})
      .then((user)=> console.log(user))
      .catch((err)=>console.log(err.message))
        res.send("Provider uploaded Profile picture successfully")
    })
    
  },
  
  uploadSeekerProfilePicture:function(req,res){
    let imageContent = convertBufferToString(req.file.originalname,req.file.buffer)
    cloudinary.uploader.upload(imageContent).then(function(imageResponse){
      JobSeekerDetail.findByIdAndUpdate(req.jobSeeker._id,{profilePicture:imageResponse.secure_url})
      .then((user)=> res.status(200))
      .catch((err)=>console.log(err.message))
        console.log(imageResponse)
        res.send("Seeker uploaded Profile picture successfully")
    })
    
  }
}

    // userLogin : async (req, res) => {
    //   if(req.body.role === 'Job-Provider'){
    //     const {email, password} = req.body
    //     if(!email || !password){
    //       return res.status(400).send('Invalid email and Password')
    //     }else{
    //       const user = await JobProviderDetail.find({email : email})
    //       if(!user){
    //         return res.send({Error : ' '})
    //       }else{
    //         const ismatched = await bcrypt.compare(password, user[0].password)
    //         if(!ismatched){
    //           return res.send({Error : ''})
    //         }else{
    //           const token = await jwt.sign({_id : user._id}, process.env.privatekey, {expiresIn : 60})
    //           user[0].jwt = token
    //           await JobProviderDetail.findByIdAndUpdate()
    //           console.log('logged in')
    //         }
    //       }
    //     }
    //   }
    // }