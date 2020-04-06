const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan")
const fs = require("fs");
const path = require("path");
const cors = require("cors")
// const mom = require("mom")

dotenv.config();
require("./db");

const app = express();
app.use(cors());
// app.use(mom);
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(helmet())
app.use(compression());
const accessLogsStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {Flags : 'a' })
app.use(morgan('combined', {stream : accessLogsStream })) 



// ---------------------Removing CORS error-----------------------

// app.use((req, res,next)=>{
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
//     if(req.method === 'Options'){
//       res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, DELETE, POST')
//       return res.status(200).json({})
//     }
//     next()
//   })

// ------------------------All Routes--------------------------

app.use(require("./api/routes/getRoutes"))
app.use(require("./api/routes/postRoutes"))
app.use(require("./api/routes/updateRoutes"))
app.use(require("./api/routes/deleteRoutes"))



module.exports = app;


// fetch("http://localhost:8080/api/jobseeker/searchjobs/byjobid/5e8463975c40d0372ccbe1f1/isaccepted",{
//   method:"PATCH",
//   headers:{
//     "Content-Type": "application/json",
//     "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZThhNDIyNjc2NGZhMDI5NTQ4ZGI5ODkiLCJpYXQiOjE1ODYxODkzNTUsImV4cCI6MTY0NjE4OTM1NX0.coYs17Nd_Npt7Fc9W5JISrOeGCtPqk8v5lWSS8UkE_s"
//   }
// }).then(data=>data.json()).then(dataJson=>dataJson).then(dataJsonn=>console.log(dataJsonn)).catch(err=>console.log(err))