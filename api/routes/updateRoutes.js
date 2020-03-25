const { Router } = require("express");
const router = Router();
const { updatingJob }=require("../controllers/updateControllers")
const api_key = process.env.api_key

router.patch(`/api/jobprovider/udpatingjob/:jobid/${api_key}`, updatingJob)



module.exports=router;

