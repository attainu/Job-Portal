const { Router } = require("express");
const router = Router();
const {authenticateProvidersToken, authenticateSeekersToken} = require("../middlewares/authenticate")
const { updatingJob, isAcceptedJob, updatingAnything }=require("../controllers/updateControllers")

router.patch(`/api/jobprovider/udpatingjob/:jobid/`,authenticateProvidersToken, updatingJob)
router.patch(`/api/jobseeker/searchjobs/byjobid/:jobid/isaccepted/`,authenticateSeekersToken, isAcceptedJob)




// --------------------Admin Updating--------------------
router.patch(`/api/updatingAnything/`, updatingAnything);

module.exports=router;

