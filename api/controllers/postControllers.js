const JobDetail = require("../models/Job")



module.exports = {
    postingJob: function (req, res) {
        const jobdetail = new JobDetail({
            category: req.body.category,
            duration: req.body.duration,
            title:req.body.title,
            description:req.body.description,
            preferedSkills:req.body.preferedSkills,
            rateOfPayment:req.body.rateOfPayment,
            preference:req.body.preference,
            postedAt:new Date(),
            timeSlot:req.body.timeSlot,
            keyword:req.body.keyword,
            contactNumber:req.body.contactNumber,
            jobProviderName:req.body.jobProviderName
        });
        jobdetail.save()
        .then(()=>{
            console.log("job posted successfully")
            res.status(200).json(jobdetail)
        })
        .catch((err)=> {
            console.log(err.message)
            return res.status(403).send(err.message)
        });
    }
}