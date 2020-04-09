var bcrypt = require("bcryptjs")

bcrypt.hash("40627166",10)
.then(res=>console.log(res))