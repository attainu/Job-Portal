const mongoose = require("mongoose")
const Schema = mongoose.Schema

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
    keyword:[],    
    jobProviderId:{ 
        type: Schema.Types.ObjectId,
        ref: 'jobProviderDetail' 
    },
    jobProviderName: {
        type: String,
        required:false
    },
    jobProviderEmail: {
        type: String,
        required:false
    },
    isAccepted:{
        type:Boolean,
        default:false
    },
    jobSeekerId: {
        type: Schema.Types.ObjectId,
        ref: 'jobSeekerDetail'
    },
    jobSeekerName: {
        type: String,
        required:false
    },
    jobSeekerContactNumber: {
        type: Number,
        required:false
    },
    jobSeekerAadhaarNumber: {
        type: Number,
        required:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
    
}, { timestamps: true })

const JobDetails = mongoose.model("jobDetail", jobDetailSchema)

module.exports = JobDetails