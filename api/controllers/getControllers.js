const JobDetail = require("../models/Job")

module.exports = {
    searchNotYetAcceptedJobs: function (req, res) {

        JobDetail.find({ isAccepted: false })
            .skip(((req.params.pagenumber) - 1) * 5)
            .limit(5)
            .sort({ createdAt: -1 })
            .then((allJobs) => {
                JobDetail.find({})
                    .count({}, function (err, count) { console.log("COUNT = ", count); res.status(302).json({ 'count': count, 'allJobs': allJobs }) });

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
            .then((allJobs) => {
                JobDetail.find({ category: req.params.category })
                    .count({}, function (err, count) { console.log("COUNT = ", count); res.status(302).json({ 'count': count, 'allJobs': allJobs }) });

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
            .then((allJobs) => {
                JobDetail.find({ city: req.params.city })
                    .count({}, function (err, count) { console.log("COUNT = ", count); res.status(302).json({ 'count': count, 'allJobs': allJobs }) });

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
            .then((allJobs) => {
                JobDetail.find({ pincode: req.params.pincode })
                    .count({}, function (err, count) { console.log("COUNT = ", count); res.status(302).json({ 'count': count, 'allJobs': allJobs }) });

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
            .then((allJobs) => {
                JobDetail.find({ keyword: req.params.keyword })
                    .count({}, function (err, count) { console.log("COUNT = ", count); res.status(302).json({ 'count': count, 'allJobs': allJobs }) });
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
                    .count({}, function (err, count) { console.log("COUNT = ", count); res.status(302).json({ 'count': count, 'allJobs': allJobs }) });

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
            .then((allJobs) => {
                JobDetail.find({})
                    .count({}, function (err, count) { console.log("COUNT = ", count); res.status(302).json({ 'count': count, 'allJobs': allJobs }) });

            })
            .catch((err) => {
                console.log(err.message)
                return res.status(404).send(err.message)
            });
    }
}