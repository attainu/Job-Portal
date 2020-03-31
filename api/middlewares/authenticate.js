var JobProviderDetails = require("../models/JobProvider");
var JobSeekerDetails = require("../models/JobSeeker");
const jwt = require("jsonwebtoken");

 module.exports = {async authenticateProvidersToken(req, res, next) {
    try {
        const token = req.header('Authorization')
        console.log(token)
        if (!token) return res.sendStatus(401)
        const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log("PAYLOAD Provider = ", payload)
        if (!payload._id) {
            return res.sendStatus(403)
        }
        const jobProvider = await JobProviderDetails.findOne({_id: payload._id, jwt: token})
        if(!jobProvider) return res.sendStatus(401)
        req.jobProvider = jobProvider
        console.log(jobProvider)
        next()
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
},
async  authenticateSeekersToken(req, res, next) {
    try {
        const token = req.header('Authorization')
        if (!token) return res.sendStatus(401)
        const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log("PAYLOAD Seeker = ", payload)
        if (!payload._id) {
            return res.sendStatus(403)
        }
        const jobSeeker = await JobSeekerDetails.findOne({_id: payload._id, jwt: token})
        if(!jobSeeker) return res.sendStatus(401)
        req.jobSeeker = jobSeeker
        next()
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
},
async authenticateAdminsToken (req,res,next){
    try {
        const token = req.header('Authorization')
        if (!token) return res.sendStatus(401)
        const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log("PAYLOAD Seeker = ", payload)
        if (!payload._id) {
            return res.sendStatus(403)
        }
        const admin = await AdminDetails.findOne({_id: payload._id, jwt: token})
        if(!admin) return res.sendStatus(401)
        req.admin = admin
        next()
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

}



