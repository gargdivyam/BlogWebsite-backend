const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    message:{
        type:String
    }
});

const Contact = new mongoose.model("Contact", ContactSchema);
module.exports = Contact;