import { Router } from "express";
import { handleBookedTiicket ,viewTicketDetails} from "../controllers/bookedTicket.js";

export const bookedRouter = Router();

bookedRouter.post("/", handleBookedTiicket);
bookedRouter.post("/view", viewTicketDetails);

