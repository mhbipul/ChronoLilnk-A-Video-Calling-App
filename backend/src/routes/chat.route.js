import express from "express"
import { protectRouter } from "../middlewares/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";

const router = express.Router()

router.get("/token",protectRouter,getStreamToken)


export default router;