const JobDetail = require("../models/Job")
const JobSeekerDetail = require("../models/jobSeeker")
const JobProviderDetail = require("../models/JobProvider")
const {isAcceptedMailToSeeker,isAcceptedMailToProvider} = require("../utils/nodeMailer")

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
       
        JobDetail.findByIdAndUpdate(req.params.jobid, { isAccepted: true , jobSeekerId: req.jobSeeker._id,jobSeekerName:req.jobSeeker.name,jobSeekerContactNumber:req.jobSeeker.contactNumber, jobSeekerAadhaarNumber:req.jobSeeker.aadhaarNumber})
            .then((job) => {
                console.log(job);
                isAcceptedMailToProvider(job.jobProviderEmail,job.title,job.createdAt,req.jobSeeker.name);
                JobSeekerDetail.findById(req.jobSeeker._id)
                    .then((jobSeeker) => {
                        isAcceptedMailToSeeker(jobSeeker.email,job.title,job.createdAt,job.jobProviderName)
                        console.log("mail sent to seeker")
                        return jobSeekerJobsIncrement(jobSeeker.totalAccepted)
                    })
                    .then((totalAccepted) => JobSeekerDetail.findByIdAndUpdate(req.jobSeeker._id, { totalAccepted: totalAccepted }))
                    .catch((err)=>res.send(err))
                
                    console.log("job accepted")
                return res.status(202).send('job accepted')
            }) .catch((err) => res.status(304))
},
           
    

    //--------------------Admin Controlling-----------------

    updatingAnything: function (req, res) {
        JobDetail.updateMany({}, { isAccepted: false })
            .then(() => {
                console.log("job updated successfully by admin")
                return res.status(202).send('job updated successfully by admin')
            })
            .catch((err) => res.status(304))
    },
}

