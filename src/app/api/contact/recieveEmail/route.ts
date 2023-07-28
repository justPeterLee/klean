import nodemailer, { Transporter } from "nodemailer";

const transporter: Transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.FORWARD_USER,
    pass: process.env.FORWARD_PASS,
  },
});

// userEmail: string, message: string

export const POST = async (req: any) => {
  try {
    // Send the email
    await transporter.sendMail({
      from: "leepeter2119@gmail.com",
      to: process.env.CONTACT_INFO, // your main email address
      subject: "Contact Form Submission",
      text: "test email",
    });
  } catch (error) {
    console.log("Error occurred while sending email: " + error);
  }
};
