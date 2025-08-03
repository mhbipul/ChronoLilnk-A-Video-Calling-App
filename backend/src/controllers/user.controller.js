import User from "../models/User.js";

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