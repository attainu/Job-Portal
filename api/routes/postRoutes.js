const { Router } = require("express");
const router = Router();
const { postingJob, userRegister, userLogin } = require("../controllers/postControllers")
const api_key = process.env.api_key

//-----------------Job Providers Routes-----------------------
router.post(`/api/jobprovider/postingjob/${api_key}`, postingJob);

//--------------------Register Route for Job - Provider/Seeker ------------------
router.post(`/api/user/register/${api_key}`, userRegister); 
router.post(`/api/user`, function(req, res) {
    res.send("Hello Testing Route...")
}); 

//--------------------Login/Logout Routes for Job - Provider/Seeker ----------------------
router.post(`/api/user/login/${api_key}`, userLogin); 
// router.post(`/api/job`, userLogin)

module.exports=router;

