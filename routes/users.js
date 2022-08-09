import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  likeVideo,
  dislikeVideo,
} from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//UPDATE USER
router.put("/:id", verifyToken, updateUser);
//DELETE USER
router.delete("/:id", verifyToken, deleteUser);

//GET A USER
router.get("/find/:id", getUser);

//SUBSCRIBE A USER
router.put("/sub/:id", verifyToken, subscribe);

//UNSUBSCRIBE A USER
router.put("/unsub/:id", verifyToken, unsubscribe);

//LIKE A VIDEO
router.put("/like/:videoId", verifyToken, likeVideo);

//DISLIKE A VIDEO
router.put("/dislike/:videoId", verifyToken, dislikeVideo);

export default router;
