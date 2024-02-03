import nodemaile from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const {NET_PASSWORD, EMAIL_FROM} = process.env

const emailConfig = {
    host: "smtp.sendgrid.net",
    port: 587,
    secure: true,
    auth: {
      user: EMAIL_FROM,
      pass: NET_PASSWORD,
    },
  }

  const transport = nodemaile.createTransport(emailConfig);


  export const sendEmail = (data) => {
    const email = { ...data, from: EMAIL_FROM };
    return transport.sendMail(email);
  };
