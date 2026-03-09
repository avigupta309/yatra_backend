import { Router } from "express";
import multer from "multer";
import {
  HandleUserDelete,
  changePassword,
  HandleUserInfo,
  HandleLogin,
  HandleUserSignUp,
  viewAllUser,
  handleChangeRole,
  ViewOneUSer,
} from "../controllers/user.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const UserRouter = Router();

UserRouter.post("/login", HandleLogin);
UserRouter.post("/usersignup", HandleUserSignUp);
UserRouter.post("/specificuser", HandleUserInfo);
UserRouter.put("/channgepwd", upload.single("profilePic"), changePassword);
UserRouter.delete("/userdelete", HandleUserDelete);
UserRouter.get("/viewuser", viewAllUser);
UserRouter.put(
  "/changerole/:id",
  upload.single("profilePic"),
  handleChangeRole,
);
UserRouter.get("/viewoneuser/:id", ViewOneUSer);
