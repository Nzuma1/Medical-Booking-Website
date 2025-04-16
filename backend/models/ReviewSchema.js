import mongoose from "mongoose";
import Doctor from "./DoctorSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

// Populate user details when retrieving reviews
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

// Static method to calculate average ratings
reviewSchema.statics.calcAverageRatings = async function (doctorId) {
  const stats = await this.aggregate([
    {
      $match: { doctor: doctorId },
    },
    {
      $group: {
        _id: "$doctor",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Doctor.findByIdAndUpdate(doctorId, {
      totalRating: stats[0].numOfRating,
      averageRating: stats[0].avgRating,
    });
  } else {
    await Doctor.findByIdAndUpdate(doctorId, {
      totalRating: 0,
      averageRating: 0,
    });
  }
};

// Call calcAverageRatings after saving a review
reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.doctor);
});

export default mongoose.model("Review", reviewSchema);
