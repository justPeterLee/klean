"use client";
import styles from "../../styling/Contact.module.css";
export function ContactForm() {
  return <form className={styles.ContactFormContainer}></form>;
}

export function ContactDesc() {
  return (
    <div className={styles.description}>
      <p>
        Feel free to send a message to our team an email. We’ll try to reply as
        fast as possible, the average response might take 2 - 5 business day.
        Thanks so much for your support!
      </p>
    </div>
  );
}
