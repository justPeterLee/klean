"use client";
import styles from "../../../styling/User.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InputValidation } from "@/components/ContactPage/ContactForm";
import Link from "next/link";
export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState({
    email: true,
    password: true,
  });
  const [focus, setFocus] = useState({
    email: false,
    password: false,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(true);
  const [passError, setPassError] = useState(true);
  const handleSignIn = async () => {
    const proxyValues: any = { email, password };
    let proxyError: any = error;
    setEmailError(true);
    setPassError(true);

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

    if (!Object.values(proxyError).includes(false)) {
      try {
        console.log("running");
        const result = await signIn("credentials", {
          redirect: false,
          email: email,
          password: password,
        }).then((res) => {
          if (res?.error) {
            console.log("error");
            setEmailError(false);
            setPassError(false);
          }
        });
      } catch (err) {
        console.log("Error with signing in: ", err);
      }
    } else {
      throw new Error("Invalid Input");
    }
  };

  useEffect(() => {
    if (session && status === "authenticated") {
      router.push("/user");
    }
  }, [status, router]);
  return (
    <div className={styles.LoginContainer}>
      <p className={styles.Title}>Login</p>
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
        onEnter={() => {
          setFocus({ email: false, password: true });
        }}
        focus={focus.email}
        onBlur={() => {
          setFocus({ email: false, password: false });
        }}
        customErrorMessage="Wrong Email"
        triggerCustomError={emailError}
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
        onEnter={() => {
          handleSignIn();
          setFocus({ email: false, password: false });
        }}
        focus={focus.password}
        onBlur={() => {
          setFocus({ email: false, password: false });
        }}
        customErrorMessage="Wrong Password"
        triggerCustomError={passError}
      />

      <button onClick={handleSignIn} className={styles.SignInButton}>
        sign in
      </button>

      <Link href={"/user/register"} className={styles.Link}>
        create account
      </Link>
      {/* <button
        onClick={() => {
          signOut({ redirect: true, callbackUrl: "/user/login" });
        }}
      >
        sign out
      </button> */}
    </div>
  );
}
