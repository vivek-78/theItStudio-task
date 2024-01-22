import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./model.js";
import sendEmail from "./sendMail.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.DATABASE_URL);

app.get("/", async (req, res) => {
  console.log(process.env.EMAIL);
});
app.post("/add", async (req, res) => {
  console.log(req.body);
  const { name, mobile, email, hobbies } = req.body;
  const newUserData = await User.create({
    name,
    mobile,
    email,
    hobbies,
  });
  await newUserData.save();
  return res.status(200).send();
});
app.patch("/update", async (req, res) => {
  const { id, name, phoneNumber, email, hobbies } = req.body;
  console.log(req.body);
  await User.findByIdAndUpdate(id, {
    name,
    phoneNumber,
    email,
    hobbies,
  });
  res.status(200).send();
});
app.delete("/delete", async (req, res) => {
  const { id } = req.body;
  await findOneAndDelete({ _id: id });
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
