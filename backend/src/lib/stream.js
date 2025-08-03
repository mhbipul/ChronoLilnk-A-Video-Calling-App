import {StreamChat} from "stream-chat"
import dotenv from "dotenv"


dotenv.config()

const apiKey = process.env.STREAM_API_KEY
const apiSecret= process.env.STREAM_SECRET_KEY

if(!apiKey || !apiSecret){
    console.error("STREAM API Key or SECRET is missing!");
    
}

//creating stream client...
const streamClient = StreamChat.getInstance(apiKey,apiSecret);


//what this function will do is create a stream if it's not present, if present then it'll update it.
export const upsertStreamUser = async (userData)=>{
    try {
        await streamClient.upsertUsers([userData]);
        return userData
    } catch (error) {
        console.error("Error upserting stream user:",error);
        
        
    }
};

//generating stream token...
export const generateStreamToken = (userId)=>{
    
}