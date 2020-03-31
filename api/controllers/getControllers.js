const JobDetails = require("../models/Job")
const JobProviderDetails = require("../models/JobProvider")
const JobSeekerDetails = require("../models/JobSeeker")
const jwt = require("jsonwebtoken")

module.exports = {
    // -----------------Searching Available Jobs--------------------

    async allAvailableJobs(req, res) {
        try {
            const jobs = await JobDetails.find({ isAccepted: false })
                .skip(((req.params.pagenumber) - 1) * 5)
                .limit(5)
                .sort({ createdAt: -1 });
                 const count = await JobDetails.find({isAccepted: false})
                .countDocuments({});
                console.log("jobs=", jobs)
                console.log("count=", count)
                return res.status(200).json({ count,jobs })
        }
        catch (error) {
            return res.status(500).send(error.message)
        }
    },
    // -----------------Searching Job by Job id--------------------

    async searchJobById (req, res) { 
        try {
            const job = await JobDetails.findOne({ isAccepted: false, id: req.params.jobid })
            console.log(job)
            return res.status(200).json(job)  
        } catch (error) {
            return res.status(500).send(error.message)
        }
    },
    // -----------------Filtering Available Jobs--------------------
    async filterJobs(req, res) {
        try {
            if (!req.query) res.return("Please enter a definite query to filter out jobs")
            if (req.query.category) {
                console.log("Request.Query.Category = ", req.query.category);
                var jobs = await JobDetails.find({ isAccepted: false, category: req.query.category })
                .skip(((req.params.pagenumber) - 1) * 5)
                .limit(5)
                .sort({ createdAt: -1 });
                 const count = await JobDetails.find({isAccepted: false, category: req.query.category})
                .countDocuments({});
                console.log("jobs=", jobs)
                console.log("count=", count)
               return res.status(200).json({ count,jobs })
            }
            if (req.query.city) {
                var jobs = await JobDetails.find({isAccepted: false, city: req.query.city })
                .skip(((req.params.pagenumber) - 1) * 5)
                .limit(5)
                .sort({ createdAt: -1 });
                 const count = await JobDetails.find({isAccepted: false, city: req.query.city})
                .countDocuments({});
                console.log("jobs=", jobs)
                console.log("count=", count)
                return res.status(200).json({ count,jobs })              
            }
            if (req.query.pincode) {
                var jobs = await JobDetails.find({isAccepted: false, pincode: req.query.pincode })
                .skip(((req.params.pagenumber) - 1) * 5)
                .limit(5)
                .sort({ createdAt: -1 });
                 const count = await JobDetails.find({})
                .countDocuments({isAccepted: false, pincode: req.query.pincode});
                console.log("jobs=", jobs)
                console.log("count=", count)
                return res.status(200).json({ count,jobs })
            }
            if (req.query.preference) {
                var jobs = await JobDetails.find({isAccepted: false, preference: req.query.preference })
                .skip(((req.params.pagenumber) - 1) * 5)
                .limit(5)
                .sort({ createdAt: -1 });
                 const count = await JobDetails.find({})
                .countDocuments({isAccepted: false, preference: req.query.preference});
                console.log("jobs=", jobs)
                console.log("count=", count)
                return res.status(200).json({ count,jobs })
            }
            if (req.query.keyword) {
                var jobs = await JobDetails.find({isAccepted: false, keyword: req.query.keyword })
                .skip(((req.params.pagenumber) - 1) * 5)
                .limit(5)
                .sort({ createdAt: -1 });
                 const count = await JobDetails.find({})
                .countDocuments({isAccepted: false, keyword: req.query.keyword});
                console.log("jobs=", jobs)
                console.log("count=", count)
                return res.status(200).json({ count,jobs })
            }           
        } catch (error) {
            console.log(error)
            return res.status(500).send(error.message)
        }
    },
    // --------------------Viewing Accepted Jobs by Seeker-----------------
    async allJobsAcceptedTillDateByAParticularSeeker(req, res) {
        try {
            const jobs = await JobDetails.find({ jobSeekerId: req.jobSeeker._id })
            .skip(((req.params.pagenumber) - 1) * 5)
            .limit(5)
            .sort({ createdAt: -1 });
            const count = await JobDetails.find({ jobSeekerId: req.jobSeeker._id})
            .countDocuments({});
            return res.status(200).send({ allJobsAcceptedTillDateByAParticularSeeker: jobs, count: count })

        } catch (error) {
            console.log(error.message)
            return res.status(500).send(error.message)
        }
    },
    // --------------------Viewing Accepted Jobs by Provider-----------------
    async jobsPostedByAParticularProvider(req, res) {
        try {
            const jobs = await JobDetails.find({jobProviderId: req.jobProvider._id })
            .skip(((req.params.pagenumber) - 1) * 5)
            .limit(5)
            .sort({ createdAt: -1 });
            const count = await JobDetails.find({jobProviderId: req.jobProvider._id})
            .countDocuments({});
            return res.status(200).send({ allJobsPostedTillDateByAParticularProvider: jobs, count: count })       
        } catch (error) {
            console.log(error.message)
            return res.status(500).send(error.message)
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
                if (updated) return res.status(202).send("Account activated Successfully");
                return res.send("Account already activated")
            }
            return res.send("Invalid Token")
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    } ,
    async allAcceptedJobs(req,res) {
        try {
            const jobs = await JobDetails.find({ isAccepted: true })
                .skip(((req.params.pagenumber) - 1) * 5)
                .limit(5)
                .sort({ createdAt: -1 });
                const count = await JobDetails.find({isAccepted: true})
                .countDocuments({});
                return res.status(200).json({ count,jobs })
        } catch (error) {
            return res.status(500).send(error.message)
        }
    },
    async allProviders(req,res) {
        try {
            const jobProviders = await JobProviderDetails.find({isVerified:true})
                .skip(((req.params.pagenumber) - 1) * 5)
                .limit(5)
                .sort({ createdAt: -1 });
                const count = await JobDetails.find({})
                .countDocuments({});
                return res.status(200).json({ count,jobProviders })
        } catch (error) {
            return res.status(500).send(error.message)
        }
    },
    async allSeekers(req,res) {
        try {
            const jobSeekers = await JobSeekerDetails.find({isVerified:true})
                .skip(((req.params.pagenumber) - 1) * 5)
                .limit(5)
                .sort({ createdAt: -1 });
                const count = await JobSeekerDetails.find({})
                .countDocuments({});
                return res.status(200).json({ count,jobSeekers })
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }
    
}