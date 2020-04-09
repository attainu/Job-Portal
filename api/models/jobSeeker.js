const mongoose = require("mongoose")
const Schema = mongoose.Schema
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
        required:false,
        default:null
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
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
}, { timestamps: true })

const JobSeekerDetails = mongoose.model("jobSeekerDetail", jobSeekerSchema)
module.exports=JobSeekerDetails;