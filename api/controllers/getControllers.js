const JobDetail = require("../models/Job")

module.exports = {
    searchNotYetAcceptedJobs: function (req, res) {
        JobDetail.find({ isAccepted: false })
            .skip(((req.params.pagenumber) - 1) * 5)
            .limit(5)
            .sort({ createdAt: -1 })
            .then((notYetAcceptedJobs) => {
                JobDetail.find({})
                    .countDocuments({}, function (err, count) { console.log("count = ", count); res.status(302).json({ 'count': count, 'notYetAcceptedJobs': notYetAcceptedJobs }) });

            })
            .catch((err) => {
                console.log(err.message)
                return res.status(404).send(err.message)
            });
    },
    searchJobsByCategory: function (req, res) {
        JobDetail.find({ isAccepted: false, category: req.params.category })
            .skip(((req.params.pagenumber) - 1) * 5)
            .limit(5)
            .sort({ createdAt: -1 })
            .then((categoryJobs) => {
                JobDetail.find({ category: req.params.category })
                    .countDocuments({}, function (err, count) { console.log("count = ", count); res.status(302).json({ 'count': count, 'categoryJobs': categoryJobs }) });

            })
            .catch((err) => {
                console.log(err.message)
                return res.status(404).send(err.message)
            });
    },
    searchJobsByCity: function (req, res) {
        JobDetail.find({ isAccepted: false, city: req.params.city })
            .skip(((req.params.pagenumber) - 1) * 5)
            .limit(5)
            .sort({ timestamps: -1 })
            .then((cityJobs) => {
                JobDetail.find({ city: req.params.city })
                    .countDocuments({}, function (err, count) { console.log("count = ", count); res.status(302).json({ 'count': count, 'cityJobs': cityJobs }) });

            })
            .catch((err) => {
                console.log(err.message)
                return res.status(404).send(err.message)
            });
    },
    searchJobsByPincode: function (req, res) {
        JobDetail.find({ isAccepted: false, pincode: req.params.pincode })
            .skip(((req.params.pagenumber) - 1) * 5)
            .limit(5)
            .sort({ timestamps: -1 })
            .then((pincodeJobs) => {
                JobDetail.find({ pincode: req.params.pincode })
                    .countDocuments({}, function (err, count) { console.log("count = ", count); res.status(302).json({ 'count': count, 'pincodeJobs': pincodeJobs }) });

            })
            .catch((err) => {
                console.log(err.message)
                return res.status(404).send(err.message)
            });
    },
    searchJobById: function (req, res) {
        JobDetail.find({ isAccepted: false, _id: req.params.jobid })
            .then((job) => {
                res.status(302).json(job)
            })
            .catch((err) => {
                console.log(err.message)
                return res.status(404).send(err.message)
            });
    },
    searchJobByKeyword: function (req, res) {
        JobDetail.find({ isAccepted: false, keyword: req.params.keyword })
            .skip(((req.params.pagenumber) - 1) * 5)
            .limit(5)
            .sort({ timestamps: -1 })
            .then((keywordJobs) => {
                JobDetail.find({ keyword: req.params.keyword })
                    .countDocuments({}, function (err, count) { console.log("count = ", count); res.status(302).json({ 'count': count, 'keywordJobs': keywordJobs }) });
            })
            .catch((err) => {
                console.log(err.message)
                return res.status(404).send(err.message)
            });
    },
    searchAllJobs: function (req, res) {

        JobDetail.find({})
            .skip(((req.params.pagenumber) - 1) * 5)
            .limit(5)
            .sort({ createdAt: 1 })
            .then((allJobs) => {
                JobDetail.find({})
                    .countDocuments({}, function (err, count) { console.log("count = ", count); res.status(302).json({ 'count': count, 'allJobs': allJobs }) });

            })
            .catch((err) => {
                console.log(err.message)
                return res.status(404).send(err.message)
            });
    },
    searchAcceptedJobs: function (req, res) {

        JobDetail.find({ isAccepted: true })
            .skip(((req.params.pagenumber) - 1) * 5)
            .limit(5)
            .sort({ createdAt: 1 })
            .then((allAcceptedJobs) => {
                JobDetail.find({})
                    .countDocuments({}, function (err, count) { console.log("count = ", count); res.status(302).json({ 'count': count, 'allAcceptedJobs': allAcceptedJobs }) });
            })
            .catch((err) => {
                console.log(err.message)
                return res.status(404).send(err.message)
            });
    },
    allJobsAcceptedTillDateByAParticularSeeker: function (req, res){
        // JobDetail.find({jobSeekerDetail:req.jobSeeker._id})
        // .then((seekerJobs)=>res.status(200).json(seekerJobs))
        // .catch((err) => {
        //     console.log(err.message)
        //     return res.status(404).send(err.message)
        // });
        JobDetail.find({jobSeekerId:req.jobSeeker._id})
        .skip(((req.params.pagenumber) - 1) * 5)
        .limit(5)
        .sort({ createdAt: 1 })
        .then((seekerJobs) => {
            JobDetail.find({jobSeekerId:req.jobSeeker._id})
                .countDocuments({}, function (err, count) { console.log("count = ", count); res.status(302).json({ 'count': count, 'seekerJobs': seekerJobs }) });
        })
        .catch((err) => {
            console.log(err.message)
            return res.status(404).send(err.message)
        });
    },
    jobsPostedByAParticularProvider: function (req, res){
        JobDetail.find({jobProviderId:req.jobProvider._id})
        .skip(((req.params.pagenumber) - 1) * 5)
        .limit(5)
        .sort({ createdAt: 1 })
        .then((providerJobs) => {
            JobDetail.find({jobProviderId:req.jobProvider._id})
                .countDocuments({}, function (err, count) { console.log("count = ", count); res.status(302).json({ 'count': count, 'providerJobs': providerJobs }) });
        })
        .catch((err) => {
            console.log(err.message)
            return res.status(404).send(err.message)
        });
    }
}