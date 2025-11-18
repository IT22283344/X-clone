import express from 'express';
import { followUser, getCurrentUser, getUserProfile,syncUser,updateProfile} from '../controllers/user.controller.js';
import protectRouter from '../middleware/auth.middleware.js';
const router=express.Router()

//public routes
router.get("/profile/:username",getUserProfile);

//protected routes
router.post("/sync",protectRouter,syncUser);
router.post("/me",protectRouter,getCurrentUser);
router.put("/profile",protectRouter,updateProfile);
router.post("/follow/:targetUserId",protectRouter,followUser)

export default router;