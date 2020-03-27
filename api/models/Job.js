const mongoose = require("mongoose")
const Schema = mongoose.Schema
const joi = require("joi")

const jobDetailSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    preferedSkills: {
        type: String,
        required: true
    },
    rateOfPayment: {
        type: Number,
        required: true
    },
    preference: {
        type: String,
        require: true
    },
   timeSlot: {
        type: String,
        required: true
    },  
    contactNumber: {
        type: Number,
        required: true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    isAccepted:{
        type:Boolean,
        default:false
    },
    jobProviderId:{ 
        type: Schema.Types.ObjectId,
        ref: 'jobProviderDetail' 
    },
    jobSeekerId: {
        type: Schema.Types.ObjectId,
        ref: 'jobSeekerDetail'
    },
    keyword:[],    
    jobProviderName: String,
    jobProviderEmail: String,
    jobSeekerName:String,
    jobSeekerContactNumber:Number,
    jobSeekerAadhaarNumber:Number
    
}, { timestamps: true })

const JobDetails = mongoose.model("jobDetail", jobDetailSchema)

module.exports = JobDetails