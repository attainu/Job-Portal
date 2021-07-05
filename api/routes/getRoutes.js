const { Router } = require("express");
const router = Router();

const {
    allAvailableJobs,
    searchJobById,
    allJobsAcceptedTillDateByAParticularSeeker,
    jobsPostedByAParticularProvider,
    accountActivation,
    filterJobs,
    allAcceptedJobs,
    allProviders,
    allSeekers,
    allAvailableJobsincludingBlocked
} = require("../controllers/getControllers")

const { authenticateProvidersToken, authenticateSeekersToken, authenticateAdminsToken } = require("../middlewares/authenticate")

// --------------------------Admin------------------------------------------
router.get(`/api/admin/allavailablejobs/:pagenumber`, authenticateAdminsToken, allAvailableJobsincludingBlocked)
router.get(`/api/admin/allacceptedjobs/:pagenumber`,authenticateAdminsToken, allAcceptedJobs)
router.get(`/api/admin/allproviders/:pagenumber`, authenticateAdminsToken, allProviders)
router.get(`/api/admin/allseekers/:pagenumber`, authenticateAdminsToken, allSeekers)


 // ----------------Account Activation (Job-Provider & Job-Seeker)----------
 router.get(`/api/accountactivation/:activationtoken`, accountActivation)   // ?user=Job-Provider or Job-Seeker


 // -------------------Job Seekers Routes--------------------------------
 router.get(`/api/jobseeker/searchjobs/allavailablejobs/:pagenumber/`, allAvailableJobs)
 router.get(`/api/jobseeker/searchjobs/filter/:pagenumber`, filterJobs)  // ?query=(search by category, city, pinCode, keyword, preference)
 router.get(`/api/jobseeker/searchjobs/byjobid/:jobid/`, authenticateSeekersToken, searchJobById)
 router.get(`/api/jobseeker/jobsacceptedtilldate/:pagenumber/`, authenticateSeekersToken, allJobsAcceptedTillDateByAParticularSeeker)


 // -----------------Job Provider Routes-----------------------
 router.get(`/api/jobprovider/jobspostedtilldate/:pagenumber/`, authenticateProvidersToken, jobsPostedByAParticularProvider)



module.exports = router;

