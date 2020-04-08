const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan")
const fs = require("fs");
const path = require("path");
const cors = require("cors")

dotenv.config();
require("./db");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(helmet())
app.use(compression());
const accessLogsStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {Flags : 'a' })
app.use(morgan('combined', {stream : accessLogsStream })) 



// ---------------------Removing CORS error-----------------------

app.use((req, res,next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === 'Options'){
      res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, DELETE, POST')
      return res.status(200).json({})
    }
    next()
  })

// ------------------------All Routes--------------------------

app.get("/",(req,res)=>res.send({message:"Hi, This is an API Web Application"}))

app.use(require("./api/routes/getRoutes"))
app.use(require("./api/routes/postRoutes"))
app.use(require("./api/routes/updateRoutes"))
app.use(require("./api/routes/deleteRoutes"))



module.exports = app;

