"use client";
import styles from "../../styling/Contact.module.css";

import { useState } from "react";

interface inputValidationProps {
  valueName: string;
  errorMessage: string;
  sendValue: (param: string) => void;
}
function InputValidation(props: inputValidationProps) {
  const { valueName, errorMessage, sendValue } = props;
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState({ [valueName]: true });

  return (
    <span className={styles.inputContainer}>
      <input
        className={`${styles.input} ${!error[valueName] && styles.inputError}`}
        id={`${valueName}`}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          sendValue(e.target.value);
        }}
        onBlur={() => {
          !inputValue.replace(/\s/g, "")
            ? setError({ [valueName]: false })
            : setError({ [valueName]: true });
        }}
        onFocus={() => {
          setError({ [valueName]: true });
        }}
        placeholder={`${valueName}`}
      />
      <label
        className={`${styles.label} ${
          inputValue.replace(/\s/g, "") && styles.labelActive
        } ${!error[valueName] && styles.labelError}`}
        htmlFor={`${valueName}`}
      >
        {valueName}
      </label>
      {!error[valueName] && (
        <p className={styles.errorText}>* {errorMessage}</p>
      )}
    </span>
  );
}

export function ContactForm() {
  const [error, setError] = useState({
    first: true,
    last: true,
    email: true,
    subject: true,
    message: true,
  });
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className={styles.ContactFormContainer}>
      <form className={styles.formContainer}>
        <div className={styles.nameContainer}>
          <p>
            {first} {last}
          </p>
          {/* first name */}
          <InputValidation
            valueName="First"
            errorMessage="must include first name"
            sendValue={(value) => {
              setFirst(value);
            }}
          />

          {/* last name */}
          <InputValidation
            valueName="Last"
            errorMessage="must include last name"
            sendValue={(value) => {
              setLast(value);
            }}
          />
        </div>

        <div>
          <span>
            <label>Email</label>
            <input />
          </span>

          <span>
            <label>Order ID</label>
            <input />
          </span>
        </div>

        <div>
          <span>
            <label>Subject</label>
            <input />
          </span>

          <span>
            <label>Message</label>
            <input />
          </span>
        </div>

        <button type="submit">submit</button>
      </form>
    </div>
  );
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
