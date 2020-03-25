const mongoose = require("mongoose")
const Schema = mongoose.Schema

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
        type: Number,
        required: true
    },
    AadhaarNumber:{
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
    }
})

const JobProviderDetails=mongoose.model("jobProviderDetail", jobProviderSchema)

module.exports=JobProviderDetails