"use client";
import styles from "../../../styling/User.module.css";
import { signOut, useSession } from "next-auth/react";
import Menu from "@/components/Feature/Menu/Menu";
import { useState } from "react";
export default function User() {
  const { data: session, status } = useSession();

  const [optionState, setOptionState] = useState("color1");
  return (
    <div className={styles.UserContainer}>
      {/* {JSON.stringify(session)} */}
      <div className={styles.UsernamePlate}>
        <p>welcome, {session?.user.name}</p>
      </div>

      <div className={styles.UserInfo}>
        <div className={styles.MenuRelative}>
          <Menu
            options={["information", "favorites", "purchases"]}
            readOption={(option) => {
              setOptionState(option);
            }}
            selected={optionState}
            containerStyle={{
              top: "0",
              left: "0",
              backgroundColor: "rgb(0, 0, 0, 0.03)",
            }}
          />
        </div>

        <div className={styles.InfoDisplay}></div>
      </div>

      <button
        className={styles.UserSignoutButton}
        onClick={() => {
          signOut({ redirect: true, callbackUrl: "/user/login" });
        }}
      >
        sign out
      </button>
    </div>
  );
}
