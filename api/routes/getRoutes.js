const { Router } = require("express");
const router = Router();
const { renderingJobs }=require("../controllers/getControllers")
const api_key = process.env.api_key

router.get(`/api/jobseeker/renderingjobs/${api_key}`, renderingJobs)



module.exports=router;

// fetch("https://localhost:8080/api/jobseeker/renderingjobs/123456")
// .then( function(data){
//     return data.json()
// })
// .then(function(data) {
//     console.log(data)
// })
// .catch(function(e){
//         console.log(e);
// })
    
//fetch("http://localhost:8080/api/jobseeker/renderingjobs/123456").then((res)=>res.json()).then((data)=>console.log(data))
