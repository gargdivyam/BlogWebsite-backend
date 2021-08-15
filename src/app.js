const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 8000;
require("./db/conn");
const authRoute = require("./routers/auth");
const postRoute = require("./routers/posts");
const catRoute = require("./routers/categories");
const contactRoute = require("./routers/contact");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
console.log(path.join(__dirname, "/images"));

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "images")
    },
    filename: (req, file, cb) =>{
        cb(null, req.body.name)
    }
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
    res.status(200).send("file has been uploaded")
})

app.get("/", async(req, res)=>{
    try{
        res.send("This is homepage");
    }catch(e){
        res.send(e)
    }
});

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", catRoute);
app.use("/api/contact", contactRoute);

app.listen(port, ()=>{
    console.log(`connection is successful at port ${port}`)
});