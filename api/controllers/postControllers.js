const JobDetail = require("../models/Job");
const JobProviderDetail = require("../models/JobProvider");
const JobSeekerDetail = require("../models/jobSeeker");
const jwt = require("jsonwebtoken");

const {validationResult} = require("express-validator");

const uuid=require("uuid/v4")
const sendMailToUser = require("../utils/nodeMailer")

function jobProviderJobsIncrement(totalPosted){
         return totalPosted+=1
}

module.exports = {
  postingJob: function(req, res) {
    const jobdetail = new JobDetail({ ...req.body, jobProviderId:req.jobProvider._id });
    jobdetail
      .save()
      .then(() => {
        JobProviderDetail.findById(req.jobProvider._id).then((jobProvider)=>jobProviderJobsIncrement(jobProvider.totalPosted)).then((totalPosted)=>{
          JobProviderDetail.findByIdAndUpdate(req.jobProvider._id,{totalPosted:totalPosted}
            ).then(()=>console.log("no. of jobs posted by job provider",totalPosted))
        })
        console.log("job posted successfully");
        res.status(200).json(jobdetail);
      })
      .catch(err => {
        console.log( "POSTING JOBS ====== ", err.message);
        return res.status(403).send(err.message);
      });
  },
  userRegister: function(req, res) {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      console.log(errors.array());
      return res.status(422).send("Fatal, Validation Failed...")
    }
    if (req.body.role == "Job-Provider") {
     const tempJwt=  jwt.sign({id:Math.random()},process.env.TEMP_TOKEN_SECRET)
      const jobProviderDetail = new JobProviderDetail({ ...req.body,tempJwt:tempJwt});
      jobProviderDetail
        .save()
        .then(() => {
          sendMailToUser("provider",req.body.email,tempJwt);
          console.log("Provider registered Successfully");
          res.status(200).json(jobProviderDetail);
        })
        .catch(err => {
          console.log(err.message);
          return res.status(403).send(err.message);
        });
    } else {
      const tempJwt=  jwt.sign({id:Math.random()},process.env.TEMP_TOKEN_SECRET)
      const jobSeekerDetail = new JobSeekerDetail({ ...req.body,tempJwt:tempJwt});
      jobSeekerDetail
        .save()
        .then(() => {
          sendMailToUser("seeker",req.body.email,tempJwt);
          console.log("Seeker Registered Successfully");
          res.status(200).json(jobSeekerDetail);
        })
        .catch(err => {
          console.log(err.message);
          return res.status(403).send(err.message);
        });
    }},

  userLogin: function(req, res) {
    if (req.body.role == "Job-Provider") {
      var email = req.body.email;
      var password = req.body.password;
      if (!email || !password)
        return res.status(400).send("Incorrect credentials");
      JobProviderDetail.findByEmailAndPassword(email, password)
        .then(function(user) {
          if(!user.isVerified) return res.status(404).send("job provider not verified, please activate link sent to u through email")
          jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1000 * 60 * 10 }, function(err,token) {
            if (err) {
              console.log(err.message);
              return res.status(500).send("Server Error");
            }
            user.jwt=token;
            req.jwt = token
            user.save()
            
            console.log(user)
            res.status(200).send(user);
          });
        })
        .catch(function(err) {
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
        .then(function(user) {
          if(!user.isVerified) return res.send("job seeker not verified, please activate link sent to u through email")
          jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 6000 * 60 * 1 }, function(err,token) {
            if (err) {
              console.log(err.message);
              return res.status(500).send("Server Error");
            }
            user.jwt=token;
            req.jwt = token
            user.save()            
            console.log(user)
            res.status(200).send(user);
          });
        })
        .catch(function(err) {
          console.log(err.message);
          res.status(403).send("Login Failed");
        });
    }
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