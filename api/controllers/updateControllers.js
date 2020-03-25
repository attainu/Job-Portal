const JobDetail = require("../models/Job")

module.exports = {
    updatingJob: function (req, res) {
        console.log(req.body);
        JobDetail.findByIdAndUpdate(req.params.jobid, {...req.body})
        .then(() => {
            console.log("job updated successfully")
            return res.status(202).send('job updated successfully')
        })
        .catch((err) => res.status(304))
    }
}

