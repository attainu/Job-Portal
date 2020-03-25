const { Router } = require("express");
const router = Router();
const { updatingJob, isAcceptedJob, updatingAnything }=require("../controllers/updateControllers")
const api_key = process.env.api_key

router.patch(`/api/jobprovider/udpatingjob/:jobid/${api_key}`, updatingJob)
router.patch(`/api/jobseeker/searchjobs/byjobId/:jobid/isaccepted/${api_key}`, isAcceptedJob)




// --------------------Admin Updating--------------------
router.patch(`/api/updatingAnything/${api_key}`, updatingAnything);

module.exports=router;

