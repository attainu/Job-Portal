const { Router } = require("express");
const router = Router();
const { postingJob, userRegister, userLogin, userLogout } = require("../controllers/postControllers")
const {authenticateProvidersToken, authenticateSeekersToken} = require("../middlewares/authenticate")


//-----------------Testing-----------------------


//-----------------Job Providers Routes-----------------------
router.post(`/api/jobprovider/postingjob/`, authenticateProvidersToken, postingJob);

//--------------------Register Route for Job - Provider/Seeker ------------------
router.post(`/api/user/register/`, userRegister); 

//--------------------Login/Logout Routes for Job - Provider/Seeker ----------------------
router.post(`/api/user/login/`,userLogin); 

// router.post(`/api/job`, userLogin)

module.exports=router;

