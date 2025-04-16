import express from "express";
import {
  getAllUser,
  updateUser,
  deleteUser,
  getSingleUser,
  getMyAppointments,
  getUserProfile,
} from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// Update User
router.patch("/:id", authenticate, restrict(["patient"]), updateUser);

// Delete User
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser);

// Get User Profile
router.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile);

// Get My Appointments
router.get(
  "/appointments/my-appointments",
  authenticate,
  restrict(["patient"]),
  getMyAppointments
);

// Get Single User
router.get("/:id", authenticate, restrict(["patient"]), getSingleUser);

// Get All Users
router.get("/", authenticate, restrict(["admin"]), getAllUser);

export default router;
