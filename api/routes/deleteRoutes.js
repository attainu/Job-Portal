const { Router } = require("express");
const router = Router();
const { deletingJob, userLogout }=require("../controllers/deleteControllers")
const {authenticateProvidersToken, authenticateSeekersToken, authenticateAdminsToken} = require("../middlewares/authenticate")


// -------------------------Job-Provider Route-----------------------
router.delete(`/api/jobprovider/deletingjob/:jobid/`,authenticateProvidersToken, deletingJob)
router.delete(`/api/jobprovider/logout/`,authenticateProvidersToken, userLogout); 

// -------------------------Job-Seeker Route-----------------------
router.delete(`/api/jobseeker/logout/`, authenticateSeekersToken, userLogout); 


// ------------------------------Admin Route---------------------------
router.delete(`/api/admin/logout/`, authenticateAdminsToken, userLogout); 

module.exports=router;
