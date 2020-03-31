const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")

const jobSeekerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    aadhaarNumber:{
        type:Number,
        required:true,
        unique:true
    },
    gender:{
      type:String,
      required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    profilePicture: {
        type: String,
        required:false
    },
    role: {
        type: String,
        required: true
    },
    totalAccepted: {
        type: Number,
        default: 0
    },
    jwt:{
      type:String,
      default:null
    },
    activationToken:{
      type:String,
      required:false
      },
    isVerified:{
      type:Boolean,
      default:false
    }
}, { timestamps: true })


jobSeekerSchema.statics.findByEmailAndPassword = function(email, password) {
    var userObj = null;
    return new Promise(function(resolve, reject) {
      JobSeekerDetails.findOne({ email: email })
        .then(function(user) {
          if (!user) reject("Incorrect credentials");
          userObj = user;
          return bcrypt.compare(password, user.password);
        })
        .then(function(isMatched) {
          if (isMatched===false) reject("Incorrect credentials");
          resolve(userObj);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  };
  
  jobSeekerSchema.pre("save", function(next) {
    var user = this;
    if (user.isModified("password")) {
      bcrypt
        .hash(user.password, 10)
        .then(function(hashedPassword) {
          user.password = hashedPassword;
          next();
        })
        .catch(function(err) {
          next(err);
        });
    }
    else{
      next();
    }
    
  });


const JobSeekerDetails = mongoose.model("jobSeekerDetail", jobSeekerSchema)

module.exports=JobSeekerDetails