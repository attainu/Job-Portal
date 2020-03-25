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
        type:String,
        require:true
    },
    postedAt:{
        type:Date,
        required:true
    },
    timeSlot:{
        type:String,
        required:true
    },
    keyword:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    jobProviderName:{
        type:String,
        required:true
    }
},{timestamps:true})

const JobDetails = mongoose.model("jobDetail", jobDetailSchema)

module.exports = JobDetails