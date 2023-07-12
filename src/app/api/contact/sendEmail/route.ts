import sgMail from "@sendgrid/mail";
import { NextResponse, NextRequest } from "next/server";

interface EmailData {
  first: string;
  last: string;
  email: string;
  subject: string;
  order: string;
  message: string;
}

export async function POST(req: any) {
  const emailData: EmailData = await req.json();

  const apiKey: any = process.env.SENDGRID_API_KEY;
  sgMail.setApiKey(apiKey);

  // const createEmail = async (mailOptions: any) => {
  //   try {
  //     const info = await sgMail.send(mailOptions);
  //     console.log("Message sent: %s");
  //     return info;
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //     throw error;
  //   }
  // };

  const msg = {
    to: `${process.env.CONTACT_INFO}`, // Change to your recipient
    from: `${emailData.email}`, // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });

  // const mailOptions = {
  //   to: emailData.email,
  //   from: process.env.CONTACT_INFO,
  //   subject: `${emailData.subject}`,
  //   text: `First: ${emailData.first}\nLast: ${emailData.last}\nOrderID: ${emailData.order}\nEmail: ${emailData.email}\n\n ${emailData.message}`,
  // };

  // await createEmail(mailOptions).catch(console.error);

  return new NextResponse(JSON.stringify({ status: 200 }), {
    headers: { "content-type": "application/json" },
  });
}
