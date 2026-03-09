import { Router } from "express";
import {
  HandleBusDelete,
  HandleBusEdit,
  HandleBusInfo,
  HandleBusSubmitData,
  ViewAllBus,
} from "../controllers/bus.js";
import { filterBus, HandleSpecificBus } from "../static/bus.js";
import multer from "multer";

export const BusRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
BusRouter.post("/busupload", HandleBusSubmitData);
BusRouter.delete("/busdelete", HandleBusDelete);
BusRouter.put(
  "/busedit",
  upload.fields([
    { name: "exteriorPic", maxCount: 1 },
    { name: "interiorPic", maxCount: 1 },
  ]),
  HandleBusEdit,
);
BusRouter.post("/HandleBusInfo", HandleBusInfo);
BusRouter.get("/viewbus", ViewAllBus);

// static code is here

BusRouter.get("/specificbus/:id", HandleSpecificBus);
BusRouter.get("/filterbus", filterBus);
