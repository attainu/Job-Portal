const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
require("./db")

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(require("./api/routes/postRoutes"))
app.use(require("./api/routes/getRoutes"))
app.use(require("./api/routes/deleteRoutes"))
app.use(require("./api/routes/updateRoutes"))


module.exports = app;