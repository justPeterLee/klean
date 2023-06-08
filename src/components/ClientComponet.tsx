"use client";
import { useState, useContext, createContext, FC } from "react";

interface MyContextProps {
  sharedData: string;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export default function Client({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackDrop />
      {children}
    </>
  );
}

function BackDrop() {
  return <div>asdf</div>;
}
