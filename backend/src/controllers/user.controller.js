import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRcommendedUsers(req,res) {

    try {
        const currentUserId = req.user._id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and : [
                {_id : {$ne : currentUserId}},//exclude current user ,$ne -> not equal
                {_id : {$nin: currentUser.friends}}, //exclude current user's friends , $nin -> not in
                {isOnboarded : true}
            ],
            
        });
        res.status(200).json(recommendedUsers)





    } catch (error) {
        console.error("Error in getRecommendedUsers controller",error.message);
        res.status(500).json({message : "Internal Server Error"});
        
        
    }
    
}

export async function getMyFriends(req,res) {

    try {
        const user = await User.findById(req.user._id).select("friends").populate("friends","fullName profilePic nativeLanguage learningLanguage")


        res.status(200).json(user.friends)
    } catch (error) {
        console.error("Error in getMyFriends controller",error.message);
        res.status(500).json({message : "Internal Server Error"})
        
        
    }

    
}

export async function sendFriendRequest(req,res) {

    try {
        //getting my id..
        const myId = req.user.id;
        //getting the recipient id ,which is renamed from id to recipientId
        const {id : recipientId} = req.params;

        //check : 1 - Prevent sending request to yourself..
        if(myId == recipientId){
            return res.status(400).json({message : "You can't send friend request to yourself"})
        }

        //checking if the recipient is eligiable ...
        const recipient = await User.findById(recipientId);
        if(!recipient){
            return res.status(400).json({message:"Recipient not found"});
        }

        //check : 2 - checking if you are already friends with the user
        if(recipient.friends.includes(myId)){
            return res.status(400).json({message: "You are already friends with this user"})
        }

        //check : 3 - check if a friend request already existed
        const existingRequest = await FriendRequest.findOne({
            $or : [
                {
                    sender : myId, recipient : recipientId
                },
                {
                    sender : recipientId, recipient : myId
                }
            ]
        });
        if(existingRequest){
            return res.status(400).json({message : "A friend request already exists between you and this user."})
        }

        //creating a new friend request...
        const friendRequest = await FriendRequest.create({
            sender : myId,
            recipient : recipientId
        });

        res.status(200).json(friendRequest)

        
    } catch (error) {
        console.error("Error in sendFriendRequest controller",error.message);
        res.status(500).json({message: "Interanl Sever Error"})
        
        
    }
    
}

export async function  acceptFriendRequest(req,res) {
    try {
        //getting request id 
        const {id : requestId } = req.params;

        //finding the friend request in db 
        const friendRequest = await FriendRequest.findById(requestId);

        //#chekc 1 : if the friendrequest is existing or not ...
        if(!friendRequest){
            return res.status(404).json({message : " Friend Request not found!"})
        }

        //#check 2 : verify if the current user is the recipient...
        //  Here friendRequest.recipient type is mongodb object id , however, req.user.id is normal String....
        //  so to compare these 2, we have to convert the friendRequest.recipient to String... 
        if(friendRequest.recipient.toString() !== req.user.id){
            return res.status(403).json({message: "you are not authorized to accept this request"})
        }

        //updating friend request status ...
        friendRequest.status = "accepted";
        //saving the friend request..
        await friendRequest.save()

        //add each user to the other's friends array...
        //$addToSet : adds elements to and array only if they do not already exist
        await User.findByIdAndUpdate(friendRequest.sender,{
            $addToSet: {friends : friendRequest.recipient}
        })
        await User.findByIdAndUpdate(friendRequest.recipient,{
            $addToSet: {friends : friendRequest.sender}
        });

        res.status(200).json({message:"Friend Request accepted " })

    } catch (error) {
        console.error("Error in acceptFriendRequest Controller",error.message);
        res.status(500).json({message: " Internal Server Error"})
        
        
    }

    
}

export async function getFriendRequests(req,res) {
    try {
        const incomingReqs = await FriendRequest.find({
            recipient : req.user.id,
            status : "pending",

        }).populate("sender","fullName profilePic  nativeLanguage learningLanguage");

        const accepetedReqs = await FriendRequest.find({
            sender : req.user.id,
            status: "accepted"

        }).populate("recipient","fullName profilePic");

        res.status(200).json({incomingReqs,accepetedReqs})
        
    } catch (error) {
        console.error("Error in getFriendRequests Controller",error.message);
        res.status(500).json({message: " Internal Server Error"})
        
    }
}

export async function getOutgoingFriendReqs(req,res) {
    try {
        const outgoingReqs = await FriendRequest.find({
            sender : req.user.id,
            status : "pending"
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage")

        res.status(200).json(outgoingReqs)
        
    } catch (error) {
        console.error("Error in getOutgoingFriendReqs Controller",error.message);
        res.status(500).json({message: " Internal Server Error"})
        
    }
    
}