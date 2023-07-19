"use client";
import styles from "./InputValidation.module.css";
import { useState, useEffect, useRef } from "react";

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
  onBlur?: () => void;
  focus?: boolean;
}
export default function InputValidation({
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
  onBlur,
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

            if (onBlur) {
              onBlur();
            }
          }}
          onFocus={() => {
            setError({ [valueName]: true });
            setCustomError({ ...customError, [valueName]: false });
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter" && onEnter) {
              inputRef.current!.blur();
              e.preventDefault();
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
