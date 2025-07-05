const nodeMailer = require("nodemailer");
// const axios = require("axios");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: "../.env" });
const { RESEND_API_KEY } = process.env;
// const API_URL = "https://api.resend.com/emails";

function replaceContent(content, creds) {
  const keys = Object.keys(creds);
  keys.forEach((key) => {
    content = content.replace(`##{${key}}`, creds[key]);
  });
  return content;
}

async function emailHelper(templateName, reveiverEmail, creds) {
  try {
    const templatePath = path.join(__dirname, "email_templates", templateName);
    let content = await fs.promises.readFile(templatePath, "utf-8");
    const emailDetails = {
      from: "onboarding@resend.dev",
      to: "anuroopmallick1@gmail.com",
      subject: "Mail from ScalerShows",
      text: `Hi ${creds.name} this is your reset email otp ${creds.otp}`,
      html: replaceContent(content, creds),
    };

    const transposrtDetails = {
      host: "smtp.resend.com",
      port: 587,
      auth: {
        user: "resend",
        pass: RESEND_API_KEY,
      },
    };

    const transporter = nodeMailer.createTransport(transposrtDetails);
    await transporter.sendMail(emailDetails);

    // or use API
    // const response = await axios.post(API_URL, emailDetails, {
    //   headers: {
    //     Authorization: `Bearer ${RESEND_API_KEY}`,
    //     "Content-Type": "application/json",
    //   },
    //   httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    // });

    console.log("email sent");
  } catch (error) {
    console.log(error);
  }
}

emailHelper("otp.html", "refdc", {
  name: "Anuroop",
  otp: "1234",
});

// Three wayd to send email
// sdk
//api
//nodemailer + smtp server
