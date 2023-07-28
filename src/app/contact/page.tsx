"use client";
import styles from "../../styling/Contact.module.css";

// components
import { ContactForm, ContactDesc } from "@/components/ContactPage/ContactForm";

export default function Contact() {
  const readEmailData = async (emailData: any) => {
    await fetch("/api/contact/recieveEmail", {
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
