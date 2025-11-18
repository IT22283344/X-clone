import { clerkMiddleware } from "@clerk/express";
import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import morgan from "morgan";
import userRoutes from "./routes/user.route.js";

const dotenv = require("dotenv");
const colors = require("colors");
dotenv.config();

const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to MonogoDB successfully`.bgCyan.white);
  } catch (error) {
    console.log(`error in connection db ${error}`.bgRed.white);
  }
};
const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
app.use(clerkMiddleware());
app.use(morgan("dev"));
connectDB();

app.get("", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to X",
  });
});

const PORT = process.env.PORT || 5001;

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`server running ${PORT}`.bgGreen.white);
});
