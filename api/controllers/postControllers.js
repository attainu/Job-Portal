const JobDetail = require("../models/Job");
const JobProviderDetail = require("../models/JobProvider");
const JobSeekerDetail = require("../models/jobSeeker");
const jwt = require("jsonwebtoken");
const uuid = require("uuid/v4");

module.exports = {
  postingJob: function(req, res) {
    const jobdetail = new JobDetail({ ...req.body });
    // ({
    //     category: req.body.category,
    //     duration: req.body.duration,
    //     title:req.body.title,
    //     description:req.body.description,
    //     preferedSkills:req.body.preferedSkills,
    //     rateOfPayment:req.body.rateOfPayment,
    //     preference:req.body.preference,
    //     timeSlot:req.body.timeSlot,
    //     keyword:req.body.keyword,
    //     contactNumber:req.body.contactNumber,
    //     jobProviderName:req.body.jobProviderName,
    //     city:req.body.city,
    //     pincode:req.body.pincode,
    //     address:req.body.address
    // });
    jobdetail
      .save()
      .then(() => {
        console.log("job posted successfully");
        res.status(200).json(jobdetail);
      })
      .catch(err => {
        console.log(err.message);
        return res.status(403).send(err.message);
      });
  },
  userRegister: function(req, res) {
    if (req.body.role == "Job-Provider") {
      const jobProviderDetail = new JobProviderDetail({ ...req.body });
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
    }
  },
  userLogin: function(req, res) {
    if (req.body.role == "Job-Provider") {
      var email = req.body.email;
      var password = req.body.password;
      if (!email || !password)
        return res.status(400).send("Incorrect credentials");
      JobProviderDetail.findByEmailAndPassword(email, password)
        .then(function(user) {
          console.log(user);
          var id = uuid();
          jwt.sign({ id: id }, process.env.privateKey, { expiresIn: 60 * 60 * 1 }, function(err,token) {
            if (err) {
              console.log(err.message);
              return res.status(500).send("Server Error");
            }
            user.jwt = token;
          });
          res.status(200).send("Login Succefull", user);
        })
        .catch(function(err) {
          console.log(err.message);
          res.status(403).send("Login Failed");
        });
    }else {
      var email = req.body.email;
      var password = req.body.password;
      if (!email || !password)
        return res.status(400).send("Incorrect credentials");
        jobSeekerDetail.findByEmailAndPassword(email, password)
        .then(function(user) {
          console.log(user);
          var id = uuid();
          jwt.sign({ id: id }, process.env.privateKey, { expiresIn: 60 * 60 * 1 }, function(err,token) {
            if (err) {
              console.log(err.message);
              return res.status(500).send("Server Error");
            }
            user.jwt = token;
          });
          res.status(200).send("Login Succefull", user);
        })
        .catch(function(err) {
          console.log(err.message);
          res.status(403).send("Login Failed");
        });
    }
  }

  //   logout: function (req, res) {
  //     req.session.destroy();
  //     return res.redirect("/");
  //   }
};
