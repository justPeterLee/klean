"use client";
import styles from "./Navbar.module.css";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.logoContainer}>
          <Link href={"/"}>Logo</Link>
        </div>
        <div className={styles.linkContainer}>
          <Link href={"/shop"}>shop</Link>
          <Link href={"/about"}>about</Link>
          <Link href={"/contact"}>contact</Link>
        </div>
        <div className={styles.iconContainer}>
          <Link href={"/user"}>user</Link>
          <button className={styles.cartButton}> cart </button>
        </div>
      </div>
    </div>
  );
}
