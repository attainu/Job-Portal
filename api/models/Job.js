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
    postedAt: {
        type: Date,
        default: Date.now()
    },
    timeSlot: {
        type: String,
        required: true
    },
    keyword:[],    
    jobProviderName: {
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
    }
}, { timestamps: true })

const JobDetails = mongoose.model("jobDetail", jobDetailSchema)

module.exports = JobDetails