"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      console.log("running");
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
    } catch (err) {
      console.log("Error with signing in: ", err);
    }
  };

  return (
    <div>
      <input
        className="login-forum"
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="email"
      />

      <input
        className="login-forum"
        type="text"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="password"
      />

      <button onClick={handleSignIn}>sign in</button>
      <button
        onClick={() => {
          signOut();
        }}
      >
        sign out
      </button>
    </div>
  );
}
