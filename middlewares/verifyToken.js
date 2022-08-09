import jwt from "jsonwebtoken";
import { errorState } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorState(401, "You are not Authenticated"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorState(403, "Invalid token"));
    //user is userid from sign in in controller/auth.js
    req.user = user;
    // console.log(user);
    next();
  });
};
