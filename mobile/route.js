import { Router } from "express";
import { insertLatLng, reveiveLatLng } from "./controller.js";


export const mobileRouter = Router();

mobileRouter.post("/", insertLatLng);
mobileRouter.get("/reveiveLatLng", reveiveLatLng);
