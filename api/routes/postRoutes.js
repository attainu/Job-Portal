const { Router } = require("express");
const router = Router();
const { postingJob }=require("../controllers/postControllers")
const api_key = process.env.api_key

router.post(`/api/jobprovider/postingjob/${api_key}`, postingJob)



module.exports=router;

