"use client";
import styles from "../../styling/Contact.module.css";
import ContactForm from "@/components/ContactPage/ContactForm";

export default function Contact() {
  return (
    <main className={styles.main}>
      <ContactForm />
    </main>
  );
}
