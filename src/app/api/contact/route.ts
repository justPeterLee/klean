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

  const apiKey: any = process.env.SMTP_API_KEY;
  sgMail.setApiKey(apiKey);

  const createEmail = async (mailOptions: any) => {
    try {
      const info = await sgMail.send(mailOptions);
      console.log("Message sent: %s");
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };

  const mailOptions = {
    from: emailData.email,
    to: process.env.CONTACT_INFO,
    subject: `${emailData.subject}`,
    text: `First: ${emailData.first}\nLast: ${emailData.last}\nOrderID: ${emailData.order}\nEmail: ${emailData.email}\n\n ${emailData.message}`,
  };

  await createEmail(mailOptions).catch(console.error);

  return new NextResponse(JSON.stringify({ status: 200 }), {
    headers: { "content-type": "application/json" },
  });
}
