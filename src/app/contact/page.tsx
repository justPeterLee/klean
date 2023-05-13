"use client";
import styles from "../../styling/Contact.module.css";
import { ContactForm, ContactDesc } from "@/components/ContactPage/ContactForm";

export default function Contact() {
  return (
    <main className={styles.main}>
      <ContactForm />
      <ContactDesc />
    </main>
  );
}
