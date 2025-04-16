import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

import bcrypt from "bcryptjs";

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { password, ...otherFields } = req.body;

  try {
    // Check if password is being updated
    if (password) {
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      otherFields.password = hashPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: otherFields },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "Successfully retrieved user",
      data: user,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "User not found" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Successfully retrieved users",
      data: users,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Users not found" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "Profile loaded successfully",
      data: { ...rest },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, failed to load profile",
    });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    // Retrieve appointments from booking for a user
    const bookings = await Booking.find({ user: req.userId });
    // Extract doctor ids from booked appointments
    const doctorsIds = bookings.map((el) => el.doctor.id);
    // Retrieve doctors by id
    const doctors = await Doctor.find({ _id: { $in: doctorsIds } }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "Appointments loaded successfully",
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, failed to load appointments",
    });
  }
};