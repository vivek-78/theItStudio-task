import mongoose from "mongoose";
const userDataSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  mobile: String,
  hobbies: String,
});

const UserData = mongoose.model("UserData", userDataSchema);
export default UserData;
