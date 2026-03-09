import { Router } from "express";
import multer from "multer";
import {
  HandleDriverDelete,
  HandleDriverEdit,
  HandleDriverLogin,
  HandleDriverSignUp,
  viewAllDriver,
  viewSpecificDriver,
} from "../controllers/Driver.js";
const storage = multer.memoryStorage();
const upload = multer({ storage });
export const DriverRouter = Router();
DriverRouter.post("/driverlogin", HandleDriverLogin);
DriverRouter.post("/driversignup", HandleDriverSignUp);
DriverRouter.put(
  "/handledriveredit",
  upload.single("profilePic"),
  HandleDriverEdit,
);
DriverRouter.delete("/handledriverdelete", HandleDriverDelete);
DriverRouter.get("/viewalldriver", viewAllDriver);
DriverRouter.get("/specificdriver/:id", viewSpecificDriver);
