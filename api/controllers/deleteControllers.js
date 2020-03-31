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
            const destroyed = await JobDetails.findOneAndDelete({ _id: req.params.jobid });
            if (!destroyed) throw new Error('Job do not exist(or)deleted already')
            const jobProviderDetails = await JobProviderDetails.findOne({ _id: req.jobProvider._id })
            const totalPosted = jobProviderJobsDecrement(jobProviderDetails.totalPosted)
            jobProviderDetails.totalPosted = totalPosted;
            jobProviderDetails.save()
            return res.status(202).send("One job deleted Successfully")
        } catch (error) {
            return res.status(404).send(error.message)
        }
    },

    // ----------------------Logout from Account (Job-Provider & Job-Seeker)------------------------
    async userLogout(req, res) {
        try {
            if (req.jobProvider) { var schema = JobProviderDetails; var user = req.jobProvider }
            if (req.jobSeekers) { var schema = JobSeekerDetails; var user = req.jobSeeker }
            if (req.admin) { var schema = AdminDetails; var user = req.admin }
            await schema.findOneAndUpdate({ _id: user._id }, { jwt: null })
            return res.status(202).send("You are successfully logged out");
        } catch (error) {
            res.status(404).send(error.message)
        }
    }
}















// const JobDetail = require("../models/Job")
// const JobProviderDetail = require("../models/JobProvider")
// const JobSeekerDetail = require("../models/jobSeeker")

// function jobProviderJobsDecrement(totalPosted) {
//     return totalPosted -= 1
// }

// module.exports = {
//     deletingJob: function (req, res) {
//         JobDetail.findOneAndDelete({ _id: req.params.jobid, jobProviderId: req.jobProvider._id })
//             .then(() => {
//                 JobProviderDetail.findById(req.jobProvider._id)
//                 .then((jobProvider) => jobProviderJobsDecrement(jobProvider.totalPosted))
//                 .then((totalPosted) => JobProviderDetail.findByIdAndUpdate(req.jobProvider._id, { totalPosted: totalPosted })
//                 .then(() => res.status(202).send("One job deleted Successfully")))
//             })
//             .catch((err) => res.status(404).send(err.message))
//     },
//     jobProviderLogout: function (req, res) {
//         JobProviderDetail.findByIdAndUpdate(req.jobProvider._id, { jwt: "" })
//             .then(() => {
//                 console.log("You are successfully logged out.")
//                 return res.status(202).send("You successfully logged out");
//             })
//             .catch((err) => res.status(404).send(err.message))
//     },
//     jobSeekerLogout: function (req, res) {
//         JobSeekerDetail.findByIdAndUpdate(req.jobSeeker._id, { jwt: "" })
//             .then(() => {
//                 console.log("You are succefully logged out.")
//                 return status(202).send("You successfully logged out.");
//             })
//             .catch((err) => res.status(404).send(err.message))
//     }
// }