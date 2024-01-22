import mongoose from "mongoose"
const userDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  hobbies: [String],
});

const UserData = mongoose.model("UserData", userDataSchema);
export default UserData;
