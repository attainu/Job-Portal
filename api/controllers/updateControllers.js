const JobDetail = require("../models/Job")
const JobSeekerDetail = require("../models/jobSeeker")

function jobSeekerJobsIncrement(totalPosted) {
    return totalPosted += 1
}

module.exports = {
    updatingJob: function (req, res) {
        console.log(req.body);
        JobDetail.findByIdAndUpdate(req.params.jobid, { ...req.body })
            .then(() => {
                console.log("job updated successfully by provider")
                return res.status(202).send('job updated successfully by provider')
            })
            .catch((err) => res.status(304))
    },
    isAcceptedJob: function (req, res) {
        console.log(req.params.jobid)
        JobDetail.findByIdAndUpdate(req.params.jobid, { isAccepted: true , jobSeekerId: req.jobSeeker._id })
            .then(() => {
                JobSeekerDetail.findById(req.jobSeeker._id)
                    .then((jobSeeker) => jobSeekerJobsIncrement(jobSeeker.totalAccepted))
                    .then((totalAccepted) => JobSeekerDetail.findByIdAndUpdate(req.jobSeeker._id, { totalAccepted: totalAccepted }))
                    console.log("job accepted")
                return res.status(202).send('job accepted')
            }) .catch((err) => res.status(304))
},
           
    

    //-------------Admin Controlling------------

    updatingAnything: function (req, res) {
        JobDetail.updateMany({}, { isAccepted: false })
            .then(() => {
                console.log("job updated successfully by admin")
                return res.status(202).send('job updated successfully by admin')
            })
            .catch((err) => res.status(304))
    },
}

