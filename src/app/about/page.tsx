"use client";
import { useState } from "react";
import Menu from "@/components/Feature/Menu/Menu";
import styles from "../../styling/About.module.css";
export default function About() {
  const [optionSelected, setOptionSelected] = useState("About Us");

  const readOption = (option: string) => {
    setOptionSelected(option);
  };
  return (
    <main className={` ${styles.container}`}>
      <div className={styles.menuContainer}>
        <Menu
          options={["About Us", "Our Team"]}
          readOption={readOption}
          selected={optionSelected}
          containerStyle={{ top: "0", left: "0" }}
        />
      </div>

      {optionSelected === "About Us" && (
        <div className={styles.aboutContainer}>about us</div>
      )}
      {optionSelected === "Our Team" && (
        <div className={styles.teamContainer}>our team</div>
      )}
    </main>
  );
}
