const { Router } = require("express");
const router = Router();

const {
    searchNotYetAcceptedJobs,
    searchJobById,
    allJobsAcceptedTillDateByAParticularSeeker,
    jobsPostedByAParticularProvider,
    accountActivation,
    filterJobs
} = require("../controllers/getControllers")

const { authenticateProvidersToken, authenticateSeekersToken } = require("../middlewares/authenticate")



// // ----------------Account Activation (Job-Provider & Job-Seeker)----------
// router.get(`/api/accountactivation/:activationtoken`, accountActivation)   // ?user=Job-Provider or Job-Seeker


// // -------------------Job Seekers Routes--------------------------------
router.get(`/api/jobseeker/searchjobs/notyetaccepted/:pagenumber/`, searchNotYetAcceptedJobs)
// router.get(`/api/jobseeker/searchjobs/filter/:pagenumber`, filterJobs)  // ?query=(search by category, city, pinCode, keyword, preference)
// router.get(`/api/jobseeker/searchjobs/byjobId/:jobid/`, authenticateSeekersToken, searchJobById)
// router.get(`/api/jobseeker/jobsacceptedtilldate/:pagenumber/`, authenticateSeekersToken, allJobsAcceptedTillDateByAParticularSeeker)


// // -----------------Job Provider Routes-----------------------
// router.get(`/api/jobprovider/jobspostedtilldate/:pagenumber/`, authenticateProvidersToken, jobsPostedByAParticularProvider)



module.exports = router;

