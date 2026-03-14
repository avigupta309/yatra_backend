import { userModel } from "../models/users.js";
import { createToken } from "../service/user.js";
import { UploadImage } from "../upload/UploadImage.js";

export async function HandleUserSignUp(req, res) {
  const { fullName, email, phoneNumber, password, role } = req.body;
  const isUserExist = await userModel.findOne({ email: email });
  if (isUserExist)
    return res.status(409).json({ data: "Email is already Exist" });
  try {
    await userModel.create({
      fullName,
      email,
      role,
      phoneNumber,
      password,
    });
    return res.status(201).json({
      data: "SignUp Sucessfully ",
      user: { fullName: fullName, email: email },
    });
  } catch (error) {
    console.log("cannot signup", error.message);
    return res
      .status(400)
      .json({ data: "Cannot Signup because phoneNumber already exist" });
  }
}

export async function HandleLogin(req, res) {
  const { email, password, role } = req.body;
  const user = await userModel.findOne({ email: email });
  if (!user) return res.status(404).json({ data: "Email is Not registred" });
  try {
    const isMatchPassword = await user.matchPassword(password);
    console.log("here match")
    console.log(isMatchPassword)
    const token = createToken(isMatchPassword);
    // res.cookie("tokenId", token, { httpOnly: true });
    res.cookie("tokenId", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      data: "SignIn Sucessfully ",
      user: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phoneNumber,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    return res.status(401).json({ data: "Password not match..." });
  }
}

export async function HandleUserInfo(req, res) {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (!user)
      return res.status(404).json({ data: "User Not Found At this Email" });
    return res.status(201).json({ data: user });
  } catch (error) {
    return res.status(400).json({ data: "Enter valid Email" });
  }
}

export async function changePassword(req, res) {
  const { email, password, newPassword } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ data: "Enter Valid Email" });
    user.matchPassword(password);

    if (password === newPassword) {
      return res.status(400).json({
        data: "New password cannot be same as old password",
      });
    }

    user.password = newPassword.trim();
    if (req.file) {
      const profileImage = await UploadImage(req);
      if (profileImage && profileImage !== "Image upload failed") {
        user.profileImage = profileImage;
      }
    }

    await user.save();

    return res.status(200).json({
      data: "Password Changed Successfully",
    });
  } catch (error) {
    return res.status(401).json({
      data: error.message || "Something Went Wrong",
    });
  }
}

export async function HandleUserDelete(req, res) {
  const { email } = req.body;
  try {
    const userExist = await userModel.findOne({ email: email });
    if (!userExist)
      return res
        .status(400)
        .json({ data: "User Email is Not Found In DataBase" });
    return res.status(200).json({ data: "User Deleted Sucessfully" });
  } catch (error) {
    return res.status(500).json({ data: "Something Went Wrong" });
  }
}

export async function viewAllUser(req, res) {
  try {
    const users = await userModel.find();
    if (!users)
      return res.status(400).json({ data: "No any user yet registered" });
    return res.status(200).json({ users: users });
  } catch (error) {
    return res.status(500).json({ data: "Something Went Wrong" });
  }
}

export async function handleChangeRole(req, res) {
  const { id } = req.params;
  const { email, role, fullName, phoneNumber } = req.body;
  const profileImage = await UploadImage(req);
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) return res.status(401).json({ data: "plz Enter Valid Email" });
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { role, fullName, phoneNumber, email, profileImage },
      { new: true, runValidators: true },
    );
    return res.status(201).json({ data: updatedUser });
  } catch (error) {
    return res.status(500).json({ data: "Something Went Wrong" });
  }
}

export async function ViewOneUSer(req, res) {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) return res.status(401).json({ data: "plz Select Correct User" });
    return res.status(201).json({ data: user });
  } catch (error) {
    return res.status(500).json({ data: "Something Went Wrong" });
  }
}
