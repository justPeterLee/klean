import nodemailer, { Transporter } from "nodemailer";

const transporter: Transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.CONTACT_INFO, // your Gmail email address
    pass: process.env.CONTACT_PASSWORD, // your Gmail password
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

    console.log("Email sent successfully!");
  } catch (error) {
    console.log("Error occurred while sending email: " + error);
  }
};
