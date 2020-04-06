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
  aadhaarNumber: {
    type: Number,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    required: true
  },
  contactNumber: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    required:false
  },
  role: {
    type: String,
    required: true
  },
  totalPosted: {
    type: Number,
    default: 0
  },
  jwt: {
    type: String,
    default: null
  },
  activationToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isBlocked:{
      type:Boolean,
      default:false
  }
}, { timestamps: true })





const JobProviderDetails = mongoose.model("jobProviderDetail", jobProviderSchema)

module.exports = JobProviderDetails