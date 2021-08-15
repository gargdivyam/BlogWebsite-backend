const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true
}).then(()=>console.log("DB is connected"))
.catch((e)=>console.log(e));