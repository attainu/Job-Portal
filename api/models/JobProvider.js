const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")


const jobProviderSchema = new Schema({
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
    contactNumber:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    profilePicture: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    totalPosted: {
        type: Number,
         default: 0
    },
    jwt:{
      type:String,
      default:""
    }
}, { timestamps: true })


jobProviderSchema.statics.findByEmailAndPassword = function(email, password) {
    var userObj = null;
    return new Promise(function(resolve, reject) {
      JobProviderDetails.findOne({ email: email })
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
  
  jobProviderSchema.pre("save", function(next) {
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



const JobProviderDetails=mongoose.model("jobProviderDetail", jobProviderSchema)

module.exports=JobProviderDetails