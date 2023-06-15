"use client";
import styles from "../../../styling/User.module.css";
import { signOut, useSession } from "next-auth/react";
import Menu from "@/components/Feature/Menu/Menu";
import { useState } from "react";
export default function User() {
  const { data: session, status } = useSession();

  const [optionState, setOptionState] = useState("information");
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

        <div className={styles.InfoDisplay}>
          {optionState === "information" ? (
            <UserInfo />
          ) : optionState === "favorites" ? (
            <UserFavorite />
          ) : (
            <Purchases />
          )}
        </div>
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

function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className={styles.UserInfoContainer}>
      <span className={styles.InfoTitleContainer}>
        <p>Information</p>
      </span>
      <span className={styles.InfoName}>
        <span>
          <p className={styles.InfoTitle}>first:</p>
          <p className={styles.InfoValue}>{session?.user.name.split(" ")[0]}</p>
        </span>
        <span>
          <p className={styles.InfoTitle}>last:</p>
          <p className={styles.InfoValue}>{session?.user.name.split(" ")[1]}</p>
        </span>
      </span>

      <span className={styles.InfoEmail}>
        <span className={styles.Email}>
          <p className={styles.InfoTitle}>email:</p>
          <p className={styles.InfoValue}>{session?.user.email}</p>
        </span>

        <span className={styles.phone}>
          <p className={styles.InfoTitle}>phone number:</p>
          <p className={styles.InfoValue}>N/a</p>
        </span>
      </span>

      <span className={styles.InfoShipping}>
        <span>
          <p className={styles.InfoTitle}>shipping address:</p>
          <p className={styles.InfoValue}>N/a</p>
        </span>
      </span>
    </div>
  );
}

function UserFavorite() {
  return (
    <div className={styles.UserInfoContainer}>
      <span className={styles.InfoTitleContainer}>
        <p>Favorites</p>
      </span>
    </div>
  );
}

function Purchases() {
  return (
    <div className={styles.UserInfoContainer}>
      <span className={styles.InfoTitleContainer}>
        <p>Purchases</p>
      </span>
    </div>
  );
}
