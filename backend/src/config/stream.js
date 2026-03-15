import { StreamChat } from 'stream-chat';
import { ENV } from "../config/env.js"


const streamClient = StreamChat.getInstance(ENV.STREAM_API_KEY, ENV.STREAM_API_SECRET)

export const upsertStreamUser = async (userData) => {
    try{
        await streamClient.upsertUser(userData)
        console.log("User: ", userData.name)
        return userData
    }
    catch(error){
        console.log("error upserting: ", error)
    }
};

export const deleteStreamUser = async (userId) => {
    try{
        await streamClient.deleteUser(userId)
        console.log("User: ", userId, " deleted");
    }
    catch(error){
        console.log("error deleting: ", error)
    }
};

export const generateStreamToken = (userId) => {
    try{
        const userIdString = userId.toString();
        return streamClient.createToken(userIdString);
    }
    catch(error){
        console.log("Error creating the token ", error)
        return null;
    }
}