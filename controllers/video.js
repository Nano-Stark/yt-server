import { errorState } from "../middlewares/error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const addVideo = async (req, res, next) => {
  try {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(errorState(404, "Video not found"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(
        errorState(403, "You do not have permission to update video")
      );
    }
  } catch (err) {
    next(err);
  }
};
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(errorState(404, "Video not found"));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("Video deleted successfully");
    } else {
      return next(
        errorState(403, "You do not have permission to delete video")
      );
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(errorState(404, "Video not found"));
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("The view has been increased!");
  } catch (err) {
    next(err);
  }
};

export const randomVideo = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 20 } }]);
    //   if (!video) return next(errorState(404, "Video not found"));
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// sort({view:-1}) means most viewd views while 1 means less viewed
export const trendVideo = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    // if (!video) return next(errorState(404, "Video not found"));
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const subscribedVideo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedTo;

    const videoList = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    res
      .status(200)
      .json(videoList.flat().sort((a, b) => b.ceatedAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const taggedVideo = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  // console.log(tags);
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const searchVideo = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(20);

    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
