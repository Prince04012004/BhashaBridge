import mongoose from "mongoose";

const conversationSchema=new mongoose.Schema(

    {
        sourcelanguage:{
            type:String,
            required:true
        },
         targetlanguage:{
            type:String,
            required:true
        },
         originaltext:{
            type:String,
            required:true
        },
         translatetext:{
            type:String,
            required:true
        },
    }
)

const Conversation=mongoose.model("Conversation",conversationSchema);
export default Conversation;