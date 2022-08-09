import express from "express";
import {
  addVideo,
  deleteVideo,
  getVideo,
  updateVideo,
  addView,
  trendVideo,
  randomVideo,
  subscribedVideo,
  taggedVideo,
  searchVideo,
} from "../controllers/video.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//CREATE VIDEO
router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/trend", trendVideo);
router.get("/random", randomVideo);
router.get("/subscriptions", verifyToken, subscribedVideo);
router.get("/tags", taggedVideo);
router.get("/search", searchVideo);

export default router;
