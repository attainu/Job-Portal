const JobDetail = require("../models/Job");
const JobProviderDetail = require("../models/JobProvider");
const JobSeekerDetail = require("../models/jobSeeker");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


module.exports = {
  postingJob: function(req, res) {
    const jobdetail = new JobDetail({ ...req.body });
    jobdetail
      .save()
      .then(() => {
        console.log("job posted successfully");
        res.status(200).json(jobdetail);
      })
      .catch(err => {
        console.log( "POSTING JOBS ====== ", err.message);
        return res.status(403).send(err.message);
      });
  },
  userRegister: function(req, res) {
    if (req.body.role == "Job-Provider") {
      const jobProviderDetail = new JobProviderDetail({ ...req.body});
      jobProviderDetail
        .save()
        .then(() => {
          console.log("Provider registered Successfully");
          res.status(200).json(jobProviderDetail);
        })
        .catch(err => {
          console.log(err.message);
          return res.status(403).send(err.message);
        });
    } else {
      const jobSeekerDetail = new JobSeekerDetail({ ...req.body });
      jobSeekerDetail
        .save()
        .then(() => {
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
          // const accessToken = jwt.sign({_id: user._id }, process.env.ACCESS_TOKEN_SECRET)
          // user.save()
          // res.json({accessToken : accessToken})
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
    // else {
    //   var email = req.body.email;
    //   var password = req.body.password;
    //   if (!email || !password)
    //     return res.status(400).send("Incorrect credentials");
    //   JobSeekerDetail.findByEmailAndPassword(email, password)
    //     .then(function(user) {
    //       jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 * 1 }, function(err,token) {
    //         if (err) {
    //           console.log(err.message);
    //           return res.status(500).send("Server Error");
    //         }
    //         user.jwt=token;
    //         req.jwt = token
    //         user.save()            
    //         console.log(user)
    //         res.status(200).send(user);
    //       });
    //     })
    //     .catch(function(err) {
    //       console.log(err.message);
    //       res.status(403).send("Login Failed");
    //     });
    // }
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