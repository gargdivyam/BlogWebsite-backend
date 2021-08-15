const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async(req, res)=>{
    try{
        const newCat = new Category(req.body);
        const saveCat = await newCat.save();
        res.status(200).send(saveCat);
    }catch(e){
        res.status(500).send(e);
    }
});

router.get("/", async(req, res)=>{
    try{
        const cat = await Category.find();
        res.status(200).send(cat);
    }catch(e){
        res.status(500).send(e);
    }
});


module.exports = router;