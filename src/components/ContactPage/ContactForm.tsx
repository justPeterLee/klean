"use client";
import styles from "../../styling/Contact.module.css";

import { useEffect, useState } from "react";

interface inputValidationProps {
  valueName: string;
  errorMessage: string;
  triggerError: boolean;
  sendValue: (param: string) => void;
  width?: {
    width?: string;
  };
}
function InputValidation(props: inputValidationProps) {
  const { valueName, errorMessage, triggerError, sendValue, width } = props;
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState({ [valueName]: true });

  useEffect(() => {
    if (!triggerError) {
      setError({ [valueName]: false });
    }
  }, [triggerError]);
  return (
    <span className={styles.inputContainer} style={width}>
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

interface ProxyError {
  first: boolean;
  last: boolean;
  email: boolean;
  order: boolean;
  subject: boolean;
  message: boolean;
}
export function ContactForm() {
  const [error, setError] = useState({
    first: true,
    last: true,
    email: true,
    order: true,
    subject: true,
    message: true,
  });
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let proxyErrorObj: ProxyError = error;

    if (!first.replace(/\s/g, "")) {
      proxyErrorObj = { ...proxyErrorObj, first: false };
      setError({ ...proxyErrorObj, first: false });
    } else {
      proxyErrorObj = { ...proxyErrorObj, first: true };
      setError({ ...proxyErrorObj, first: true });
    }

    console.log(error);

    if (!last.replace(/\s/g, "")) {
      proxyErrorObj = { ...proxyErrorObj, last: false };
      setError({ ...proxyErrorObj, last: false });
    } else {
      proxyErrorObj = { ...proxyErrorObj, last: true };
      setError({ ...proxyErrorObj, last: true });
    }

    if (!email.replace(/\s/g, "")) {
      proxyErrorObj = { ...proxyErrorObj, email: false };
      setError({ ...proxyErrorObj, email: false });
    } else {
      proxyErrorObj = { ...proxyErrorObj, email: true };
      setError({ ...error, email: true });
    }

    if (!order.replace(/\s/g, "")) {
      proxyErrorObj = { ...proxyErrorObj, order: false };
      setError({ ...proxyErrorObj, order: false });
    } else {
      proxyErrorObj = { ...proxyErrorObj, order: true };
      setError({ ...proxyErrorObj, order: true });
    }

    if (!subject.replace(/\s/g, "")) {
      proxyErrorObj = { ...proxyErrorObj, subject: false };
      setError({ ...proxyErrorObj, subject: false });
    } else {
      proxyErrorObj = { ...proxyErrorObj, subject: true };
      setError({ ...proxyErrorObj, subject: true });
    }

    if (!message.replace(/\s/g, "")) {
      proxyErrorObj = { ...proxyErrorObj, message: false };
      setError({ ...proxyErrorObj, message: false });
    } else {
      proxyErrorObj = { ...proxyErrorObj, message: true };
      setError({ ...proxyErrorObj, message: true });
    }
  };
  return (
    <div className={styles.ContactFormContainer}>
      <form className={styles.formContainer} onSubmit={sendMessage}>
        <div className={styles.nameContainer}>
          {/* first name */}
          <InputValidation
            valueName="First"
            triggerError={error.first}
            errorMessage="must include first name"
            sendValue={(value) => {
              setFirst(value);
            }}
          />

          {/* last name */}
          <InputValidation
            valueName="Last"
            triggerError={error.last}
            errorMessage="must include last name"
            sendValue={(value) => {
              setLast(value);
            }}
          />
        </div>

        <div className={styles.nameContainer}>
          {/* email */}
          <InputValidation
            valueName="Email"
            triggerError={error.email}
            errorMessage="must include your email"
            sendValue={(value) => {
              setFirst(value);
            }}
          />

          {/* order id */}
          <InputValidation
            valueName="Order ID"
            triggerError={error.order}
            errorMessage="must include order id"
            sendValue={(value) => {
              setLast(value);
            }}
          />
        </div>

        <div className={styles.contentContainer}>
          {/* subject */}
          <InputValidation
            valueName="Subject"
            triggerError={error.subject}
            errorMessage="must include subjet"
            sendValue={(value) => {
              setSubject(value);
            }}
            width={{ width: "33.5rem" }}
          />

          {/* subject */}
          <InputValidation
            valueName="Message"
            triggerError={error.message}
            errorMessage="must include message"
            sendValue={(value) => {
              setMessage(value);
            }}
            width={{ width: "33.5rem" }}
          />
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
