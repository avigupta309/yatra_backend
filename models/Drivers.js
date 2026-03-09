import { Schema, model, set } from "mongoose";
import { createHmac, randomBytes } from "crypto";

function capitalizeWords(str) {
  return str
    .trim()
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
const driverSchema = new Schema(
  {
    driverName: {
      type: String,
      required: true,
      trim: true,
      set: capitalizeWords,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "driver", "operator"],
      default: "driver",
    },
    profileImage: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

driverSchema.pre("save", function (next) {
  const driver = this;
  if (!driver.isModified("password")) return next();
  const salt = randomBytes(16).toString("hex");
  const hashPassword = createHmac("sha256", salt)
    .update(driver.password)
    .digest("hex");
  driver.password = hashPassword;
  driver.salt = salt;
  return next();
});

driverSchema.methods.matchPassword = function (typePassword) {
  const driver = this;
  const salt = driver.salt;
  const userHash = createHmac("sha256", salt)
    .update(typePassword)
    .digest("hex");
  const driverVerified = userHash === driver.password;
  if (!driverVerified) throw new Error("Driver's Password Not Match");
  return driver;
};

export const DriverModel = model("drivers", driverSchema);
