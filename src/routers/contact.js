const router = require("express").Router();
const Contact = require("../models/Contactus");

router.post("/", async(req, res)=>{
    try{
        const addMessage = new Contact(req.body);
        const saveMessage = await addMessage.save();
        res.status(200).send({message: "Details are added", message: saveMessage});
    }catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;