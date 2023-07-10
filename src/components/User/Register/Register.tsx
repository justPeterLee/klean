"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { InputValidation } from "@/components/ContactPage/ContactForm";
import styles from "../../../styling/User.module.css";
import Link from "next/link";
export default function Register() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState({
    first: true,
    last: true,
    email: true,
    password: true,
  });

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();
    console.log("is working");

    const proxyValues: any = { first, last, email, password };
    let proxyError: any = error;

    const keys = Object.keys(proxyValues);

    keys.map((key: string) => {
      if (proxyValues[key].replace(/\s/g, "")) {
        proxyError[key] = true;
      } else {
        proxyError[key] = false;
      }
    });

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ first, last, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    setError({ ...proxyError });
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
      />

      <button type="submit" className={styles.SignInButton}>
        submit
      </button>

      <Link href={"/user/login"}>already have an account</Link>
    </form>
  );
}
