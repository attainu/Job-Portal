const { Router } = require("express");
const router = Router();
const upload = require("../utils/multer")
const { authenticateProvidersToken, authenticateSeekersToken } = require("../middlewares/authenticate")
const {
    updatingJob,
    isAcceptedJob,
    uploadProfilePicture,
    editProfile,
    editPassword,
} = require("../controllers/updateControllers")

// ----------------------------Job Provider Routes-------------------
router.patch(`/api/jobprovider/udpatingjob/:jobid/`, authenticateProvidersToken, updatingJob)
router.patch(`/api/jobprovider/uploadprofilepicture`, authenticateProvidersToken, upload.single("image"), uploadProfilePicture);
router.patch(`/api/jobprovider/editprofile`, authenticateProvidersToken, editProfile)
router.patch(`/api/jobprovider/editpassword`, authenticateProvidersToken, editPassword)


// ----------------------------Job Seeker Routes-------------------
router.patch(`/api/jobseeker/searchjobs/byjobid/:jobid/isaccepted/`, authenticateSeekersToken, isAcceptedJob)
router.patch(`/api/jobseeker/uploadprofilepicture`, authenticateSeekersToken, upload.single("image"), uploadProfilePicture);
router.patch(`/api/jobseeker/editprofile`, authenticateSeekersToken, editProfile)
router.patch(`/api/jobseeker/editpassword`, authenticateSeekersToken, editPassword)




module.exports = router;

