import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./model.js";
import sendEmail from "./sendMail.js";
import dotenv from "dotenv";
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';


dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors())
const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.DATABASE_URL);

app.get("/", async (req, res) => {
  const userData = await User.find();
   res.send(userData).status(200);
});
app.post("/add", async (req, res) => {
  const { name, mobile, email, hobbies } = req.body.data;
  const newUserData = await User.create({
    userId:uuidv4(),
    name,
    mobile,
    email,
    hobbies,
  });
  await newUserData.save();
  return res.status(200).send();
});
app.patch("/update", async (req, res) => {
  const { userId, name, phoneNumber, email, hobbies } = req.body;
  await User.findOneAndUpdate({userId}, {
    name,
    phoneNumber,
    email,
    hobbies,
  });
  res.status(200).send();
});
app.patch("/delete", async (req, res) => {
  const { userId } = req.body;
  await User.findOneAndDelete({ userId });
  return res.status(200).send();
});
app.post("/sendMail", async (req, res) => {
  const { usersData } = req.body;
  console.log(usersData[0]);
  await sendEmail(usersData);
  return res.send("Mail sent");
});
app.listen(PORT, () => {
  console.log("server running on port 8080");
});
