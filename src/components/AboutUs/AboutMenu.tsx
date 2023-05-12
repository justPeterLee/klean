"use client";
import Menu from "../Feature/Menu/Menu";
import { useState } from "react";
export default function AboutMenu() {
  const [optionSelected, setOptionSelected] = useState("About Us");

  const readOption = (option: string) => {
    setOptionSelected(option);
  };
  return (
    <Menu
      options={["About Us", "Our Team"]}
      readOption={readOption}
      selected={optionSelected}
    />
  );
}
