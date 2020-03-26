const JobDetail = require("../models/Job")
const JobProviderDetails = require("../models/JobProvider")
const JobSeekerDetails = require("../models/jobSeeker")

module.exports={
    deletingJob:function(req,res){
        JobDetail.findByIdAndDelete(req.params.jobid)
        .then(()=>{
            console.log("job deleted successfully")
            return res.status(202).send('job deleted successfully')
        })
        .catch((err)=>res.status(404).send(err.message))
    },
    jobProviderLogout: function(req, res){
        JobProviderDetails.findByIdAndUpdate(req.jobProvider._id, {jwt:""})
        .then((user)=>{            
            console.log("You are successfully logged out.")
            return res.status(202).send("You successfully logged out");
        })
        .catch((err)=>res.status(404).send(err.message))
    },
    jobSeekerLogout: function(req, res) {
        JobSeekerDetails.findByIdAndUpdate(req.jobSeeker._id, {jwt:""})
        .then(() => {
            console.log("You are succefully logged out.")
            return status(202).send("You successfully logged out.");
        }) 
        .catch((err)=>res.status(404).send(err.message))
    }
}