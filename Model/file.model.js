const mongoose=require("mongoose")
const fileSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true,},
    file:{type:String,required:true},
    size:{type:String,required:true},
})
const fileModel=mongoose.model("file",fileSchema)
module.exports=fileModel