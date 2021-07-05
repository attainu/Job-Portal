const JobDetails = require("../models/Job")
const JobProviderDetails = require("../models/JobProvider")
const JobSeekerDetails = require("../models/JobSeeker")
const jwt = require("jsonwebtoken")

module.exports = {
    // -----------------Searching Available Jobs--------------------

    async allAvailableJobs(req, res) {
        try {
            const jobs = await JobDetails.find({ isAccepted: false,isBlocked:false })
                .skip(((req.params.pagenumber) - 1) * 10)
                .limit(10)
                .sort({ createdAt: -1 });
                 const count = await JobDetails.find({isAccepted: false,isBlocked:false })
                .countDocuments({});
                return res.status(200).json({ count,jobs })
        }
        catch (error) {
            return res.status(500).send({error:error.message})
        }
    },
    // -----------------Searching Job by Job id--------------------

    async searchJobById (req, res) { 
        try {
            const job = await JobDetails.findOne({ isAccepted: false, _id: req.params.jobid ,isBlocked:false})
            console.log(job)
            return res.status(200).json({job})  
        } catch (error) {
            return res.status(500).send({error:error.message})
        }
    },
    // -----------------Filtering Available Jobs--------------------
    async filterJobs(req, res) {
        try {
            if (!req.query) res.return({error:"Please enter a definite query to filter out jobs"})
            if (req.query.category) {
                var jobs = await JobDetails.find({ isAccepted: false, category: req.query.category ,isBlocked:false})
                .skip(((req.params.pagenumber) - 1) * 10)
                .limit(10)
                .sort({ createdAt: -1 });
                 const count = await JobDetails.find({isAccepted: false, category: req.query.category,isBlocked:false})
                .countDocuments({});
               return res.status(200).json({ count,jobs })
            }
            if (req.query.city) {
                var jobs = await JobDetails.find({isAccepted: false, city: req.query.city ,isBlocked:false})
                .skip(((req.params.pagenumber) - 1) * 10)
                .limit(10)
                .sort({ createdAt: -1 });
                 const count = await JobDetails.find({isAccepted: false, city: req.query.city,isBlocked:false})
                .countDocuments({});
                return res.status(200).json({ count,jobs })              
            }
            if (req.query.pincode) {
                var jobs = await JobDetails.find({isAccepted: false, pincode: req.query.pincode ,isBlocked:false})
                .skip(((req.params.pagenumber) - 1) * 10)
                .limit(10)
                .sort({ createdAt: -1 });
                 const count = await JobDetails.find({})
                .countDocuments({isAccepted: false, pincode: req.query.pincode,isBlocked:false});
                return res.status(200).json({ count,jobs })
            }
            if (req.query.preference) {
                var jobs = await JobDetails.find({isAccepted: false, preference: req.query.preference,isBlocked:false })
                .skip(((req.params.pagenumber) - 1) * 10)
                .limit(10)
                .sort({ createdAt: -1 });
                 const count = await JobDetails.find({})
                .countDocuments({isAccepted: false, preference: req.query.preference,isBlocked:false});
                return res.status(200).json({ count,jobs })
            }
            if (req.query.keyword) {
                var jobs = await JobDetails.find({isAccepted: false, keyword: req.query.keyword ,isBlocked:false})
                .skip(((req.params.pagenumber) - 1) * 10)
                .limit(10)
                .sort({ createdAt: -1 });
                 const count = await JobDetails.find({})
                .countDocuments({isAccepted: false, keyword: req.query.keyword,isBlocked:false});
                return res.status(200).json({ count,jobs })
            }           
        } catch (error) {
            console.log(error)
            return res.status(500).send({error:error.message})
        }
    },
    // --------------------Viewing Accepted Jobs by Seeker-----------------
    async allJobsAcceptedTillDateByAParticularSeeker(req, res) {
        try {
            const jobs = await JobDetails.find({ jobSeekerId: req.jobSeeker._id ,isBlocked:false})
            .skip(((req.params.pagenumber) - 1) * 10)
            .limit(10)
            .sort({ createdAt: -1 });
            const count = await JobDetails.find({ jobSeekerId: req.jobSeeker._id,isBlocked:false})
            .countDocuments({});
            console.log({ jobSeekerId: req.jobSeeker._id ,isBlocked:false})
            return res.status(200).send({count, jobs: jobs })

        } catch (error) {
            console.log(error.message)
            return res.status(500).send({error:error.message})
        }
    },
    // --------------------Viewing Accepted Jobs by Provider-----------------
    async jobsPostedByAParticularProvider(req, res) {
        try {
            const jobs = await JobDetails.find({jobProviderId: req.jobProvider._id ,isBlocked:false})
            .skip(((req.params.pagenumber) - 1) * 10)
            .limit(10)
            .sort({ createdAt: -1 });
            const count = await JobDetails.find({jobProviderId: req.jobProvider._id,isBlocked:false})
            .countDocuments({});
            return res.status(200).send({ jobs: jobs, count: count })       
        } catch (error) {
            console.log(error.message)
            return res.status(500).send({error:error.message})
        }
    },
        // ---------------------Account Activation (Job-Provider & Job-Seeker)-----------------------

    async accountActivation(req, res) {
        try {
            if (!req.query.user) throw new Error("invalid route")

            else if (req.query.user === "Job-Provider") var schema = JobProviderDetails
            else if (req.query.user === "Job-Seeker") var schema = JobSeekerDetails;
            else throw new Error("invalid route")
            if (!req.params.activationtoken) return res.status(401)
            const payload = await jwt.verify(req.params.activationtoken, process.env.TEMP_TOKEN_SECRET);
            if (payload) {
                const updated = await schema.findOneAndUpdate( {activationToken: req.params.activationtoken},{ isVerified: true, activationToken: null })               
                if (updated) return res.status(202).send({message:"Account activated Successfully. Please visit SeasonalEmployment.com and Login"});
                return res.send({message:"Account already activated. Visit Seasonal Jobs website to login into your Account"})
            }
            return res.send({error:"Invalid Token"})
        }
        catch (error) {
            console.log(error)
            res.status(500).send({error:error.message})
        }
    } ,
    // --------------------------Admin Routes------------------------------------------------------------------------
// ----------------All Jobs-----------------------------------

    async allAvailableJobsincludingBlocked(req, res) {
        try {
            const jobs = await JobDetails.find({ isAccepted: false })
                .skip(((req.params.pagenumber) - 1) * 10)
                .limit(10)
                .sort({ createdAt: -1 });
                 const count = await JobDetails.find({isAccepted: false})
                .countDocuments({});
                return res.status(200).json({ count,jobs })
        }
        catch (error) {
            return res.status(500).send({error:error.message})
        }
    },
    // ------------------- All Accepted Jobs----------------------

    async allAcceptedJobs(req,res) {
        try {
            const jobs = await JobDetails.find({ isAccepted: true })
                .skip(((req.params.pagenumber) - 1) * 10)
                .limit(10)
                .sort({ createdAt: -1 });
                const count = await JobDetails.find({isAccepted: true})
                .countDocuments({});
                return res.status(200).json({ count,jobs })
        } catch (error) {
            return res.status(500).send({error:error.message})
        }
    },
    // --------------All Providers List------------------------------------------------

    async allProviders(req,res) {
        try {
            const jobProviders = await JobProviderDetails.find({isVerified:true})
                .skip(((req.params.pagenumber) - 1) * 10)
                .limit(10)
                .sort({ createdAt: -1 });
                const count = await JobProviderDetails.find({})
                .countDocuments({});
                return res.status(200).json({ count,jobProviders })
        } catch (error) {
            return res.status(500).send({error:error.message})
        }
    },
    // --------------All Seekers List------------------------------------------------

    async allSeekers(req,res) {
        try {
            const jobSeekers = await JobSeekerDetails.find({isVerified:true})
                .skip(((req.params.pagenumber) - 1) * 10)
                .limit(10)
                .sort({ createdAt: -1 });
                const count = await JobSeekerDetails.find({})
                .countDocuments({});
                return res.status(200).json({ count,jobSeekers })
        } catch (error) {
            return res.status(500).send({error:error.message})
        }
    }
    
}