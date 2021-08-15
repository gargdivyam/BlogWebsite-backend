const router = require("express").Router();
const User = require("../models/User");
const blogPost = require("../models/Post");
const bcrypt = require("bcryptjs");

//Create a post
// router.post("/", async(req, res)=>{
//     console.log(req.body);
//     const newPost = new Post(req.body);
//     try{
//         const savePost = await newPost.save();
//         res.status(200).send({message:"Post is created", post: savePost})
//     }catch(e){
//         res.status(500).send({messgage:"cannot create post",e})
//     }
// });

router.post("/create", async(req, res)=>{
    console.log(req.body);
    const newPost = new blogPost(req.body);
    try{
        const savePost = await newPost.save();
        res.status(200).send({message:"Post is created", post: savePost})
    }catch(e){
        res.status(500).send(e);
    }
})

//update a post
router.put("/:id", async(req, res)=>{
    try{
        const checkPost = await blogPost.findById(req.params.id);
        if(checkPost.username===req.body.username){
            const updatePost = await blogPost.findByIdAndUpdate(req.params.id,{
                $set: req.body
            }, {new: true});
            res.status(200).send({message: "Post is updaated", newpost: updatePost})
        }
        else{
            res.status(401).send({message: "You can update only your post"})
        }

    }catch(e){
        res.status(500).send(e);
    }
});

//Delete a post
router.delete("/:id", async(req, res)=>{
    console.log(req.body);
    try{
        const checkPost = await blogPost.findById(req.params.id);
        console.log(checkPost);
        
        if(checkPost.username===req.body.username){
            await checkPost.delete();
            res.status(200).send({message: "Post has been deleted"})
        }else{
            res.status(401).send("You can delete only your post");
        }
    }catch(e){
        res.status(500).send(e)
    }
});

//get a post
router.get("/:id", async(req, res)=>{
    try{
        const getpost = await blogPost.findById(req.params.id);
        res.status(200).send(getpost);
    }catch(e){
        res.status(500).send("e")
    }
});

//get all posts
router.get("/", async(req, res)=>{
    try{
        const getpost = await blogPost.find();
        res.status(200).send(getpost);
    }catch(e){
        res.status(500).send("e")
    }
});

module.exports = router;