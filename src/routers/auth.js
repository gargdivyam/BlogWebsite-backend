const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//Register a user

router.post("/register", async(req, res)=>{
    try{
        console.log(req.body);
        const {name, email, password} = req.body;
        User.findOne({email: email}, async(err, user)=>{
            if(user){
                res.send({message: "User Already Registered"})
            }
            else{
                const hashPass = await bcrypt.hash(req.body.password, 10);
                const addUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashPass
                });
                const token = await addUser.generateAuthToken();
                const newUser = await addUser.save();
                res.status(200).send({message: "User is successfully registered", user: newUser})
            }
        })
    }catch(e){
        res.status(500).send({message:"There is some error", e})
    }
});

//-----login----
router.post("/login", async(req, res)=>{
    try{
        const {email, password} = req.body;
        const checkUser = await User.findOne({email:email});
        if(checkUser){
            const isMatch = await bcrypt.compare(password, checkUser.password);
            if(isMatch){
                res.send({message: "Successfully login", user: checkUser})
            }
            else{
                res.send({message: "Invalid Credentials"})
            }
        }
    }catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;