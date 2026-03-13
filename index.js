import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import colors from "colors";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

import { ConnectMongoDb } from "./Connection.js";
import { UserRouter } from "./Router/user.js";
import { checkAuthUser } from "./middleware/user.js";
import { BusRouter } from "./Router/bus.js";
import { DriverRouter } from "./Router/Driver.js";
import { CityRouter } from "./Router/city.js";
import { bookedRouter } from "./Router/bookedTicket.js";
import { mobileRouter } from "./mobile/route.js";

const corsOption = {
  origin: ["https://yatra-frontend-six.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOption));
app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
ConnectMongoDb(MONGO_URI);
app.use("/api/user", UserRouter);
app.use("/api/bus", BusRouter);
app.use("/api/driver", DriverRouter);
app.use("/api/city", CityRouter);
app.get("/", checkAuthUser("tokenId"), (req, res) => {
  return res.json({ user: req.validUser });
});
app.use("/api/bookedticket", bookedRouter);
app.get("/api/logout", (req, res) => {
  res.clearCookie("tokenId");
  return res.status(200).json({ message: "Logged out" });
});
app.use("/api/mobile", mobileRouter);

app.listen(port, () => {
  console.log(`Server is started at port : ${port}`.bgMagenta);
});

export default app;
