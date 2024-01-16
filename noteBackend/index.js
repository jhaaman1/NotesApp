import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserRoutes } from "./Routes/User.Routes.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URL, {
  dbName: process.env.MONGODB_NAME,
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});


UserRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running at http://localhost:${process.env.PORT || 8800}`
  );
});
