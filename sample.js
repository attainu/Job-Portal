const {hash}  = require("bcryptjs")

hash("8189314", 10)
.then(has=>console.log(has))