const JobDetail = require("../models/Job")
const JobProviderDetail = require("../models/JobProvider")
const JobSeekerDetail = require("../models/jobSeeker")

function jobProviderJobsDecrement(totalPosted) {
    return totalPosted -= 1
}

module.exports = {
    deletingJob: function (req, res) {
        JobDetail.findOneAndDelete({ _id: req.params.jobid, jobProviderId: req.jobProvider._id })
            .then(() => {
                JobProviderDetail.findById(req.jobProvider._id)
                .then((jobProvider) => jobProviderJobsDecrement(jobProvider.totalPosted))
                .then((totalPosted) => JobProviderDetail.findByIdAndUpdate(req.jobProvider._id, { totalPosted: totalPosted })
                .then(() => res.status(202).send("One job deleted Successfully")))
            })
            .catch((err) => res.status(404).send(err.message))
    },
    jobProviderLogout: function (req, res) {
        JobProviderDetail.findByIdAndUpdate(req.jobProvider._id, { jwt: "" })
            .then(() => {
                console.log("You are successfully logged out.")
                return res.status(202).send("You successfully logged out");
            })
            .catch((err) => res.status(404).send(err.message))
    },
    jobSeekerLogout: function (req, res) {
        JobSeekerDetail.findByIdAndUpdate(req.jobSeeker._id, { jwt: "" })
            .then(() => {
                console.log("You are succefully logged out.")
                return status(202).send("You successfully logged out.");
            })
            .catch((err) => res.status(404).send(err.message))
    }
}