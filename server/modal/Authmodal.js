import mongoose from "mongoose";

const dataschema = new mongoose.Schema({
    username:String,
    useremail:String,
    userpassword:String
},{timestamps:true})

const newmodaldata = mongoose.model("userverifydata",dataschema)

export default newmodaldata