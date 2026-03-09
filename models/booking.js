import mongoose, { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
    useremail: {
      type: String,
      required: true,
    },
    busId: {
      type: mongoose.Schema.ObjectId,
      ref: "Bus",
      required: true,
    },
    seats: [
      {
        type: String, // ["1A", "2B"]
        required: true,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Paid",
    },
    bookingStatus: {
      type: String,
      enum: ["Confirmed", "Cancelled"],
      default: "Confirmed",
    },
  },
  { timestamps: true },
);

export const BookingModel = model("bookingticket", bookingSchema);
