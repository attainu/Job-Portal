const JobDetails = require("../models/Job")
const JobProviderDetails = require("../models/JobProvider")
const JobSeekerDetails = require("../models/JobSeeker")
const AdminDetails = require("../models/Admin")

function jobProviderJobsDecrement(totalPosted) {
    return totalPosted -= 1
}

module.exports = {
    // ----------------------Deleting a Posted-Job by Job-Provider------------------------
    async deletingJob(req, res) {
        try {
            const destroyed = await JobDetails.findOneAndDelete({ _id: req.params.jobid,isBlocked: false });
            if (!destroyed) return res.send({message:'Job do not exist(or)deleted already'})
            const jobProviderDetails = await JobProviderDetails.findOne({ _id: req.jobProvider._id })
            const totalPosted = jobProviderJobsDecrement(jobProviderDetails.totalPosted)
            jobProviderDetails.totalPosted = totalPosted;
            jobProviderDetails.save()
            return res.status(202).send({message:"The job you requested is deleted Successfully"})
        } catch (error) {
            return res.status(404).send({error:error.message})
        }
    },

    // ----------------------Logout from Account (Job-Provider & Job-Seeker)------------------------
    async userLogout(req, res) {
        try {
            if (req.jobProvider) { var schema = JobProviderDetails; var user = req.jobProvider }
            if (req.jobSeeker) { var schema = JobSeekerDetails; var user = req.jobSeeker }
            if (req.admin) { var schema = AdminDetails; var user = req.admin }
            await schema.findOneAndUpdate({ _id: user._id }, { jwt: null })
            return res.status(202).send({message:"You are successfully logged out. Please visit us again."});
        } catch (error) {
            res.status(404).send({error:error.message})
        }
    }
}



