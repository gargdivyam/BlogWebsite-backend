const mongoose = require("mongoose");

const newPostSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        unique: true
    },
    description:{
        type:String,
        required: true,
    },
    username:{
        type:String,
        required: true,
        unique: false
    },
    photo:{
        type:String,
        required: false,
    },
    categories:{
        type:Array, 
        required: false
    }
    
},
{timestamps: true}
);

const blogPost = new mongoose.model("blogPost", newPostSchema);

module.exports = blogPost;