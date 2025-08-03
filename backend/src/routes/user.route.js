import express from "express"
import { protectRouter } from "../middlewares/auth.middleware.js";
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendReqs, getRcommendedUsers, sendFriendRequest } from "../controllers/user.controller.js";

const userRouter = express.Router()

//apply auth middleware to all routes 
userRouter.use(protectRouter);


userRouter.get('/',getRcommendedUsers);
userRouter.get('/friends', getMyFriends);


//sending and receiving friend request route
userRouter.post("/friend-request/:id",sendFriendRequest)
userRouter.put("/friend-request/:id/accept",acceptFriendRequest)
userRouter.get("/friend-requests",getFriendRequests)

userRouter.get("/outgoing-friend-requests",getOutgoingFriendReqs)





export default userRouter;