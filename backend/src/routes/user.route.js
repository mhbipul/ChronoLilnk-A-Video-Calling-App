import express from "express"
import { protectRouter } from "../middlewares/auth.middleware.js";
import { getMyFriends, getRcommendedUsers } from "../controllers/user.controller.js";

const userRouter = express.Router()

//apply auth middleware to all routes 
userRouter.use(protectRouter);


userRouter.get('/',getRcommendedUsers);
userRouter.get('/friends', getMyFriends);





export default userRouter;