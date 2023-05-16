import styles from "../../styling/Contact.module.css";
import { ContactForm, ContactDesc } from "@/components/ContactPage/ContactForm";

import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

const apiKey: any = process.env.SMTP_API_KEY;
sgMail.setApiKey(apiKey);

const sendEmail = async (mailOptions: any) => {
  try {
    const info = await sgMail.send(mailOptions);
    console.log("Message sent: %s");
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

async function POST(emailData: any) {
  const mailOptions = {
    from: process.env.CONTACT_INFO,
    to: process.env.CONTACT_INFO,
    subject: "subject (orderID)",
    text: "text",
  };

  await sendEmail(mailOptions);
  return new NextResponse(JSON.stringify({ status: 200 }), {
    headers: { "content-type": "application/json" },
  });
}

export default function Contact() {
  /* POST("asdf"); */

  return (
    <main className={styles.main}>
      <ContactForm />
      <ContactDesc />
    </main>
  );
}
