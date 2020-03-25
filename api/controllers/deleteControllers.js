const JobDetail = require("../models/Job")

module.exports={
    deletingJob:function(req,res){
        JobDetail.findByIdAndDelete(req.params.jobid)
        .then(()=>{
            console.log("job deleted successfully")
            return res.status(202).send('job deleted successfully')
        })
        .catch((err)=>res.status(404).send(err.message))
    }
}