const { Router } = require("express");
const router = Router();
const { deletingJob, userLogout }=require("../controllers/deleteControllers")
const {authenticateProvidersToken, authenticateSeekersToken} = require("../middlewares/authenticate")


// -------------------------Job-Provider Route-----------------------
router.delete(`/api/jobprovider/deletingjob/:jobid/`,authenticateProvidersToken, deletingJob)
router.delete(`/api/user/jobprovider/logout/`,authenticateProvidersToken, userLogout); 

// -------------------------Job-Seeker Route-----------------------
router.delete(`/api/user/jobseeker/logout/`, authenticateSeekersToken, userLogout); 

module.exports=router;
