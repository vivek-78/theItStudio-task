import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import dotenv from "dotenv";
dotenv.config();
const sendMail = (data) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  };
  let transporter = nodemailer.createTransport(config);
  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "User DashBoard",
      link:"localhost:3000/"
    },
  });
  let response = {
    body: {
      name:"User",
      intro: " ",
      table: {
        data,
      },
      outro: "Vivek",
    },
  };
  let mail = MailGenerator.generate(response);
  let message = {
    from: process.env.EMAIL,
    to: "info@redpositive.in",
    subject: "Data from user dashboard",
    html: mail,
  };
  transporter
    .sendMail(message)
    .then(() => {
      console.log("Done");
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

export default sendMail;