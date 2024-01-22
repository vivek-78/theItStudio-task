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
      name: "Crypto Tracker",
      link: "http://localhost:3000/",
    },
  });
  let response = {
    body: {
      name:"User",
      intro: "Huge price moves in your watchList!",
      table: {
        data,
      },
      outro: "These are coins with big moves today",
    },
  };
  let mail = MailGenerator.generate(response);
  let message = {
    from: process.env.EMAIL,
    to: "akepoguvivek14@gmail.com",
    subject: "Big Moves in your watchlist",
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