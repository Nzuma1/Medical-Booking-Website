import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Authorization denied, token missing" });
  }

  try {
    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please log in again" });
    }
    return res.status(401).json({ success: false, message: "Login and  " });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  let user = (await User.findById(userId)) || (await Doctor.findById(userId));

  if (!user || !roles.includes(user.role)) {
    return res.status(401).json({ success: false, message: "Acess Denied!" });
  }

  next();
};
