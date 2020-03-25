const { Router } = require("express");
const router = Router();
const { searchNotYetAcceptedJobs, searchJobsByCategory,searchJobsByCity, searchJobsByPincode, searchJobById, searchJobByKeyword, searchAllJobs,searchAcceptedJobs, allJobsAcceptedTillDateByAParticularSeeker, jobsPostedByAParticularProvider }=require("../controllers/getControllers")
const api_key = process.env.api_key


// -----------------Job Providers Routes-----------------------

router.get(`/api/jobprovider/postedjobs/:pagenumber/${api_key}`, jobsPostedByAParticularProvider)




// -------------------Job Seekers Routes--------------------------------

router.get(`/api/jobseeker/searchjobs/alljobsacceptedtilldate/:pagenumber/${api_key}`, allJobsAcceptedTillDateByAParticularSeeker )

router.get(`/api/jobseeker/searchjobs/notyetaccepted/:pagenumber/${api_key}`, searchNotYetAcceptedJobs)
router.get(`/api/jobseeker/searchjobs/bycategory/:category/:pagenumber/${api_key}`, searchJobsByCategory)
router.get(`/api/jobseeker/searchjobs/bycity/:city/:pagenumber/${api_key}`, searchJobsByCity)
router.get(`/api/jobseeker/searchjobs/bypincode/:pincode/:pagenumber/${api_key}`, searchJobsByPincode)
router.get(`/api/jobseeker/searchjobs/byjobId/:jobid/${api_key}`, searchJobById)
router.get(`/api/jobseeker/searchjobs/bykeyword/:keyword/:pagenumber/${api_key}`, searchJobByKeyword)



// -----------------------Admin Routes---------------------------

router.get(`/api/admin/searchjobs/alljobs/:pagenumber/${api_key}`, searchAllJobs)
router.get(`/api/admin/searchjobs/acceptedjobs/:pagenumber/${api_key}`, searchAcceptedJobs)
router.get(`/api/admin/searchjobs/notyetaccepted/:pagenumber/${api_key}`, searchNotYetAcceptedJobs)



module.exports=router;

