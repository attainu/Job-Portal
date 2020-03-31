const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
require("./db")

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


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

app.use(require("./api/routes/getRoutes"))
app.use(require("./api/routes/postRoutes"))
app.use(require("./api/routes/updateRoutes"))
app.use(require("./api/routes/deleteRoutes"))



module.exports = app;