"use client";
import styles from "../../styling/Contact.module.css";
import { ContactForm, ContactDesc } from "@/components/ContactPage/ContactForm";

export default function Contact() {
  /* POST("asdf"); */
  const sendEmail = async (emailData: any) => {};
  const readEmailData = async (emailData: any) => {
    console.log(emailData);

    const req = await fetch("/api/contact/recieveEmail", {
      method: "POST",
      body: JSON.stringify(emailData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <main className={styles.main}>
      <ContactForm sendEmailData={readEmailData} />
      <ContactDesc />
    </main>
  );
}
