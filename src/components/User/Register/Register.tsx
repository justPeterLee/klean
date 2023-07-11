"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { InputValidation } from "@/components/ContactPage/ContactForm";
import styles from "../../../styling/User.module.css";
import Link from "next/link";
export default function Register() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const submitButton = useRef<HTMLButtonElement>(null);
  const [error, setError] = useState({
    first: true,
    last: true,
    email: true,
    password: true,
  });
  const [focus, setFocus] = useState({
    first: false,
    last: false,
    email: false,
    password: false,
  });

  const clearFocus = () => {
    setFocus({
      first: false,
      last: false,
      email: false,
      password: false,
    });
  };
  const [emailError, setEmailError] = useState(true);
  const [passError, setPassError] = useState(true);

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setPassError(true);
    setEmailError(true);

    const proxyValues: any = { first, last, email, password };
    let proxyError: any = error;

    // checks if blank
    const keys = Object.keys(proxyValues);
    keys.map((key: string) => {
      if (proxyValues[key].replace(/\s/g, "")) {
        proxyError[key] = true;
      } else {
        proxyError[key] = false;
      }
    });

    setError({ ...proxyError });

    if (proxyValues.password.replace(/\s/g, "")) {
      if (
        proxyValues.password.match(/[a-z]/g) &&
        proxyValues.password.match(/[A-Z]/g) &&
        proxyValues.password.match(/[0-9]/g) &&
        proxyValues.password.length >= 8
      ) {
      } else {
        setPassError(false);
      }
    }

    if (!Object.values(proxyError).includes(false) && emailError && passError) {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ first, last, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            const data = await res.json();
            if (data.error === "Email already exists") {
              setEmailError(false);
            }

            throw new Error(data.error || "problem with creating account");
          } else {
            await signIn("credentials", {
              redirect: false,
              email: email,
              password: password,
            });
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      throw new Error("invalid inputs");
    }
  };
  useEffect(() => {
    if (session && status === "authenticated") {
      router.push("/user");
    }
  }, [status, router]);
  return (
    <form onSubmit={handleRegister} className={styles.LoginContainer}>
      <p className={styles.Title}>Register</p>
      <InputValidation
        valueName="First"
        triggerError={error.first}
        errorMessage="must include first name"
        sendValue={(value) => {
          // setName(value);
          setFirst(value);
        }}
        characterLimit={40}
        width={{ width: "20rem" }}
        focus={focus.first}
        onEnter={() => {
          setFocus({ ...focus, first: false, last: true });
        }}
        onBlur={clearFocus}
      />

      <InputValidation
        valueName="Last"
        triggerError={error.last}
        errorMessage="must include last name"
        sendValue={(value) => {
          // setName(value);
          setLast(value);
        }}
        characterLimit={40}
        width={{ width: "20rem" }}
        focus={focus.last}
        onEnter={() => {
          setFocus({ ...focus, last: false, email: true });
        }}
        onBlur={clearFocus}
      />

      <InputValidation
        valueName="Email"
        triggerError={error.email}
        errorMessage="must include email"
        sendValue={(value) => {
          // setName(value);
          setEmail(value);
        }}
        characterLimit={40}
        width={{ width: "20rem" }}
        customErrorMessage="Email already exists"
        triggerCustomError={emailError}
        focus={focus.email}
        onEnter={() => {
          setFocus({ ...focus, email: false, password: true });
        }}
        onBlur={clearFocus}
      />

      <InputValidation
        valueName="Password"
        triggerError={error.password}
        errorMessage="must include password"
        sendValue={(value) => {
          // setName(value);
          setPassword(value);
        }}
        characterLimit={40}
        width={{ width: "20rem" }}
        customErrorMessage="Password must be 8 character long (inclue 1 lowercase , uppercase, and number)"
        triggerCustomError={passError}
        focus={focus.password}
        onEnter={() => {
          submitButton.current?.click();
          setFocus({ ...focus, password: false });
        }}
        onBlur={clearFocus}
      />

      <button type="submit" className={styles.SignInButton} ref={submitButton}>
        submit
      </button>

      <Link href={"/user/login"}>already have an account</Link>
    </form>
  );
}
