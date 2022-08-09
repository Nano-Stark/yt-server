import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { errorState } from "../middlewares/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).json("new User created");
  } catch (err) {
    console.log(err);
    // next(err);
    next(errorState(404, "User name or email already exist"));
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User does not exit. Register!");
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return next(errorState(404, "Wrong Password"));
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password, ...others } = user._doc;
    res.cookie("access_token", token, {
      maxAge: 1000 * 60 * 30,
      httpOnly: false,
    });
    res.status(200).json(others);
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("Cookie cleared successfully");
  } catch (err) {
    next(err);
  }
};
