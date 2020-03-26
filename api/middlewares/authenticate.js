var JobProviderDetails = require("../models/JobProvider");
var JobSeekerDetails = require("../models/jobSeeker");
const jwt = require("jsonwebtoken");

 module.exports = {async authenticateProvidersToken(req, res, next) {
    try {
        const token = req.header('Authorization')
        console.log(token)
        if (!token) return res.sendStatus(401)
        const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log("PAYLOAD = ", payload)
        if (!payload._id) {
            return res.sendStatus(403)
        }
        const jobProvider = await JobProviderDetails.findOne({_id: payload._id, jwt: token})
        console.log(jobProvider)
        if(!jobProvider) return res.sendStatus(401)
        req.jobProvider = jobProvider
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
        console.log("PAYLOAD = ", payload)
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
}

}

// async function authenticateToken(req, res, next) {
//     try {
//         const token = req.header('Authorization')
//         console.log(token)
//         if (!token) return res.sendStatus(401)
//         const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
//         console.log("PAYLOAD = ", payload)
//         if (!payload._id) {
//             return res.sendStatus(403)
//         }
//         const jobProvider = await JobProvider.findOne({_id: payload._id, jwt: token})
//         console.log(jobProvider)
//         if(!jobProvider) return res.sendStatus(401)
//         req.jobProvider = jobProvider
//         next()
//     } catch (err) {
//         console.log(err)
//         res.sendStatus(500)
//     }
// }


