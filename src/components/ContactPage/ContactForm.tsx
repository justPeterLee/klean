"use client";
import styles from "../../styling/Contact.module.css";

import { useEffect, useState, useRef } from "react";

interface inputValidationProps {
  valueName: string;
  errorMessage: string;
  triggerError: boolean;
  sendValue: (param: string) => void;
  width?: {
    width?: string;
  };
  characterLimit?: number;
  isNumber?: boolean;
  initialValue?: string;
  customErrorMessage?: string;
  triggerCustomError?: boolean;
  onEnter?: () => void;
  focus?: boolean;
}
export function InputValidation({
  valueName,
  errorMessage,
  triggerError,
  sendValue,
  width,
  characterLimit,
  isNumber,
  initialValue,
  customErrorMessage,
  triggerCustomError,
  onEnter,
  focus,
}: inputValidationProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(
    initialValue ? initialValue : ""
  );
  const [error, setError] = useState({ [valueName]: true });
  const [customError, setCustomError] = useState({ [valueName]: false });
  useEffect(() => {
    if (!triggerError) {
      setError({ [valueName]: false });
    }
  }, [triggerError]);

  useEffect(() => {
    if (triggerCustomError !== undefined) {
      if (!triggerCustomError) {
        setCustomError({ [valueName]: true });
      }
    }
  }, [triggerCustomError]);

  useEffect(() => {
    if (focus) {
      inputRef.current?.focus();
    }
    if (focus === false) {
      inputRef.current?.blur();
    }
  }, [focus]);
  return (
    <span className={styles.inputContainer} style={width}>
      {!isNumber ? (
        <input
          ref={inputRef}
          style={width}
          className={`${styles.input} ${
            !error[valueName] && styles.inputError
          } ${customError[valueName] && styles.inputError}`}
          id={`${valueName}`}
          value={inputValue}
          onChange={(e) => {
            if (characterLimit) {
              if (e.target.value.length <= characterLimit) {
                setInputValue(e.target.value);
                sendValue(e.target.value);
              }
            } else {
              setInputValue(e.target.value);
              sendValue(e.target.value);
            }
          }}
          onBlur={() => {
            !inputValue.replace(/\s/g, "")
              ? setError({ [valueName]: false })
              : setError({ [valueName]: true });
          }}
          onFocus={() => {
            setError({ [valueName]: true });
            setCustomError({ ...customError, [valueName]: false });
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter" && onEnter) {
              inputRef.current!.blur();
              onEnter();
            }
          }}
          placeholder={`${valueName}`}
        />
      ) : (
        <input
          type="number"
          min="0.01"
          step="0.01"
          max="2500"
          style={width}
          className={`${styles.input} ${
            !error[valueName] && styles.inputError
          } ${customError[valueName] && styles.inputError}`}
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
            setCustomError({ ...customError, [valueName]: false });
          }}
          placeholder={`${valueName}`}
        />
      )}
      <label
        className={`${styles.label} ${
          inputValue.replace(/\s/g, "") && styles.labelActive
        } ${!error[valueName] && styles.labelError} ${
          customError[valueName] && styles.labelError
        }`}
        htmlFor={`${valueName}`}
      >
        {valueName}
      </label>

      <div className={styles.errorContainer}>
        {!error[valueName] && (
          <p className={styles.errorText}>* {errorMessage}</p>
        )}
        {customError[valueName] === true && (
          <p className={styles.errorText}>* {customErrorMessage} </p>
        )}
      </div>
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

interface ProxyInput {
  first: string;
  last: string;
  email: string;
  order: string;
  subject: string;
  message: string;
}

// contact form MAIN component
interface ContactForm {
  sendEmailData: (params: any) => void;
}

export function ContactForm(props: ContactForm) {
  const { sendEmailData } = props;
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
    let proxyInputObj: any = {
      first: first,
      last: last,
      email: email,
      order: order,
      subject: subject,
      message: message,
    };

    let keys: string[] = Object.keys(error);

    for (const key of keys) {
      if (!proxyInputObj[key].replace(/\s/g, "")) {
        proxyErrorObj = { ...proxyErrorObj, [key]: false };
        setError({ ...proxyErrorObj, [key]: false });
      } else {
        proxyErrorObj = { ...proxyErrorObj, [key]: true };
        setError({ ...proxyErrorObj, [key]: true });
      }
    }

    const values: string[] = Object.values(proxyErrorObj);

    // if input validation fails
    for (const value of values) {
      if (!value) {
        console.log("Failed!");
        return;
      }
    }

    // if input validation pass

    sendEmailData(proxyInputObj);
    return;
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
              setEmail(value);
            }}
          />

          {/* order id */}
          <InputValidation
            valueName="Order ID"
            triggerError={error.order}
            errorMessage="must include order id"
            sendValue={(value) => {
              setOrder(value);
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

        <button type="submit" className={styles.submitButton}>
          submit
        </button>
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
