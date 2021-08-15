const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const dotenv = require("dotenv");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
    
},
{timestamps: true}
);

// UserSchema.methods.generateAuthToken = async()=>{
//     try{
//         const token = jwt.sign({_id:this._id}, "twfqtydfwejfjwmdtuvfujpjwishwqudhdwqwwfr");
//         this.tokens = this.tokens.concat({token: token});
//         await this.save();
//         console.log("token is generated", token);
//         return token;
//     }
//     catch(e){
//         console.log("There is a error in generating auth token", e);
//     }
// };

UserSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id: this._id}, "qwertyuiopasdfghjklzxcvbnmzxcvbn");
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        console.log("token is: ", token);
        return token;
    }catch(e){
        // res.send(e);
        console.log("there is error in generating token",e)
    }
}

//implementing hashing i.e, converting password into hash format
// UserSchema.pre("save", async function(next){
//     if(this.isModified("password")){
//         console.log(`current password is ${this.password}`)
//         this.password = await bcrypt.hash(this.password, 10);
//         console.log(`modified password is ${this.password}`)
//     }
//     next();
// })

const User = new mongoose.model("User", UserSchema);

module.exports = User;