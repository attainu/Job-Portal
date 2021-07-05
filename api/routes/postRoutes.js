const { Router } = require("express");
const router = Router();

const { userRegister,postingJob, userLogin, forgotPassword} = require("../controllers/postControllers")

const {authenticateProvidersToken, authenticateSeekersToken} = require("../middlewares/authenticate")






//-----------------Job Provider Route-----------------------
router.post(`/api/jobprovider/postingjob`, authenticateProvidersToken, postingJob);

 //--------------------Account Register Route (Job-Provider & Job-Seeker)------------------
router.post(`/api/user/register`,  userRegister); // parameter 'email' is name of that email input fiels

 //--------------------Login Route (Admin & Job-Provider & Job-Seeker) ----------------------
router.post(`/api/user/login`,userLogin); 

//  -------Forgot Password (Sending System generated password to Email)
router.post(`/api/user/forgotpassword`,forgotPassword)







module.exports=router;

