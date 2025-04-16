import express from "express";
import {
  getAllDoctor,
  updateDoctor,
  deleteDoctor,
  getSingleDoctor,
  getDoctorProfile,
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.js";

const router = express.Router();

//nested route
router.use("/:doctorId/reviews", reviewRouter);

// update Doctor
router.patch("/:id", authenticate, restrict(["doctor"]), updateDoctor);

// delete Doctor
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);
// get single use
router.get("/:id", getSingleDoctor);

//get all Doctors
router.get("/", getAllDoctor);

export default router;