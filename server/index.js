import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./model.js";
import sendEmail from "./sendMail.js";
import dotenv from "dotenv";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.DATABASE_URL);

app.get("/", async (req, res) => {
  const userData = await User.find();
  res.send(userData).status(200);
});
app.post("/add", async (req, res) => {
  const { name, mobile, email, hobbies } = req.body.data;
  const newUserData = await User.create({
    userId: uuidv4(),
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
  await User.findOneAndUpdate(
    { userId },
    {
      name,
      phoneNumber,
      email,
      hobbies,
    }
  );
  res.status(200).send();
});
app.patch("/deleteByUserId", async (req, res) => {
  const { userId } = req.body;
  await User.findOneAndDelete({ userId });
  return res.status(200).send();
});
app.patch("/deleteMany",async (req,res) => {
    const { userIds } = req.body;
    await User.deleteMany({ userId: { $in: userIds } });
    return res.status(200).send();
})
app.post("/sendMail", async (req, res) => {
  console.log("/sendMail");
  const { userIds } = req.body;
  const users = await User.find({ userId: { $in: userIds } });
  const userData = users.map((user) => {
    return {
      userId: user.userId,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      hobbies: user.hobbies,
    };
  });
  console.log(userData);
  await sendEmail(userData);
  return res.send("Mail sent");
});
app.listen(PORT, () => {
  console.log("server running on port 8080");
});
