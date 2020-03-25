const JobDetail = require("../models/Job")

module.exports = {
    renderingJobs: function (req, res) {
        JobDetail.find({})
        .then((allJobs)=>{
            res.status(302).json(allJobs)
        })
        .catch((err)=> {
            console.log(err.message)
            return res.status(404).send(err.message)
        });
    }
}