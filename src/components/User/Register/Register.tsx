"use client";
import { useState } from "react";

export default function Register() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();
    console.log("is working");
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ first, last, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    // if (!response.ok) {
    //   throw new Error(data.message || "Something went wrong!");
    // }
  };
  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        value={first}
        onChange={(e) => {
          setFirst(e.target.value);
        }}
        placeholder="first name"
      />

      <input
        type="text"
        value={last}
        onChange={(e) => {
          setLast(e.target.value);
        }}
        placeholder="last name"
      />

      <input
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="email"
      />

      <input
        type="text"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="password"
      />

      <button type="submit">submit</button>
    </form>
  );
}
