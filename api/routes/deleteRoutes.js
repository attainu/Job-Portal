const { Router } = require("express");
const router = Router();
const { deletingJob }=require("../controllers/deleteControllers")
const api_key = process.env.api_key

router.delete(`/api/jobprovider/deletingjob/:jobid/${api_key}`, deletingJob)


module.exports=router;
