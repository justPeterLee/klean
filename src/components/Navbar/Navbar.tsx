"use client";
import { useState, useEffect, useContext } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { MyContext } from "../ClientContext";
export default function Navbar() {
  const context = useContext(MyContext);
  let lastScroll = 0;
  const [topStyle, setTopStyle] = useState<string>();

  const pageScroll = (e: any) => {
    let currentScroll: number = window.pageYOffset;

    if (currentScroll - lastScroll < 0) {
      setTopStyle("0px");
    } else {
      setTopStyle("-100px");
    }

    lastScroll = currentScroll;
  };
  useEffect(() => {
    // setPrevScrollpos(window.pageYOffset);
    window.addEventListener("scroll", pageScroll, { passive: true });
  }, []);

  return (
    <div className={styles.container} style={{ top: topStyle }}>
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
          <button
            className={styles.cartButton}
            onClick={() => {
              context?.setCartState(true);
            }}
          >
            {" "}
            cart{" "}
          </button>
          {JSON.stringify(context?.cartActive)}
        </div>
      </div>
    </div>
  );
}
