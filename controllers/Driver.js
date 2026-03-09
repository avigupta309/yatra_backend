import { DriverModel } from "../models/Drivers.js";
import { UploadImage } from "../upload/UploadImage.js";

export async function HandleDriverSignUp(req, res) {
  const { driverName, email, phoneNumber, address, password } = req.body;
  const driverExist = await DriverModel.findOne({
    $or: [{ email }, { phoneNumber }],
  });
  if (driverExist)
    return res
      .status(401)
      .json({ data: "driver email or PhoneNumber already exist" });
  try {
    await DriverModel.create({
      driverName,
      email,
      password,
      phoneNumber,
      address,
    });
    return res
      .status(201)
      .json({ data: "Driver signed up successfully", driver: driverName });
  } catch (error) {
    console.error("Signup error:", error);
    return res
      .status(400)
      .json({ data: "driver cant Signup", error: error.message });
  }
}

export async function HandleDriverLogin(req, res) {
  const { email, password } = req.body;
  const DriverExist = await DriverModel.findOne({ email: email });
  if (!DriverExist)
    return res.status(401).json({ data: "Driver Email Doesnt Exist" });
  try {
    const driver = await DriverExist.matchPassword(password);
    return res
      .status(200)
      .json({ data: "Driver login Sucessfully", driver: driver });
  } catch (error) {
    return res.status(401).json({ data: "Check your password and try again" });
  }
}

export async function HandleDriverEdit(req, res) {
  const { email, driverName, phoneNumber } = req.body;
  const driverExist = await DriverModel.findOne({ email: email });
  if (!driverExist)
    return res.status(401).json({ data: "Driver Email is Not Registered" });
  if (req.file) {
    driverExist.profileImage = await UploadImage(req);
  }
  driverExist.driverName = driverName;
  driverExist.phoneNumber = phoneNumber;
  try {
    const updateDriverData = await driverExist.save();
    return res.status(201).json({
      data: "Driver Data Updated Sucessfully",
      driver: updateDriverData,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(401).json({ data: "driver data cannot update" });
  }
}

export async function HandleDriverDelete(req, res) {
  const { email } = req.body;
  const driverExist = await DriverModel.findOne({ email: email });
  if (!driverExist) return res.status(404).json({ data: "Driver not Found" });
  try {
    await DriverModel.findOneAndDelete({ email: email });
    return res.status(200).json({ data: "Driver Deleted Sucessfully" });
  } catch (error) {
    return res.status(400).json({ data: "Cannot find This Email in Database" });
  }
}

export async function viewAllDriver(req, res) {
  try {
    const driver = await DriverModel.find({});
    return res.status(200).json({ driver: driver });
  } catch (error) {
    return res.status(400).json({ data: "Cannot find Driver list" });
  }
}

export async function viewSpecificDriver(req, res) {
  const { id } = req.params;
  try {
    const driver = await DriverModel.findById(id);
    return res.status(200).json({ driver: driver });
  } catch (error) {
    return res.status(400).json({ data: "Cannot find Driver Details" });
  }
}
