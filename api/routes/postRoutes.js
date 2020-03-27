const { Router } = require("express");
const router = Router();
const upload = require("../utils/multer")
const { postingJob, userRegister, userLogin, uploadProviderProfilePicture, uploadSeekerProfilePicture } = require("../controllers/postControllers")
const {authenticateProvidersToken, authenticateSeekersToken} = require("../middlewares/authenticate")






//-----------------Job Providers Routes-----------------------
router.post(`/api/jobprovider/postingjob`, authenticateProvidersToken, postingJob);

//--------------------Register Route for Job - Provider/Seeker ------------------
router.post(`/api/user/register`,  userRegister); // parameter 'email' is name of that email input fiels

//--------------------Login/Logout Routes for Job - Provider/Seeker ----------------------
router.post(`/api/user/login`,userLogin); 


// --------------------Uploading Profile Picture------------------------------

router.post(`/api/jobprovider/uploadprofilepicture`, authenticateProvidersToken, upload.single("image"), uploadProviderProfilePicture);

router.post(`/api/jobseeker/uploadprofilepicture`, authenticateSeekersToken, upload.single("image"), uploadSeekerProfilePicture); 






module.exports=router;

