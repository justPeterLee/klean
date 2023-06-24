"use client";
import { useState, useEffect, useContext } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { MyContext } from "../ClientContext";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  const context = useContext(MyContext);
  let lastScroll = 0;
  const [topStyle, setTopStyle] = useState<string>();

  const pageScroll = (e: any) => {
    let currentScroll: number = window.pageYOffset;
    // console.log(currentScroll);

    if (currentScroll - lastScroll < 0) {
      setTopStyle("0px");
    } else {
      if (currentScroll > 25) {
        setTopStyle("-100px");
      }
    }

    lastScroll = currentScroll;
  };
  useEffect(() => {
    window.addEventListener("scroll", pageScroll, { passive: true });
  }, []);

  return (
    <div className={styles.container} style={{ top: topStyle }}>
      <div className={styles.subContainer}>
        <div className={styles.logoContainer}>
          <Link href={"/"} className={styles.link}>
            Logo
          </Link>
        </div>
        <div className={styles.linkContainer}>
          <Link href={"/shop"} className={styles.link}>
            shop
          </Link>
          <Link href={"/about"} className={styles.link}>
            about
          </Link>
          <Link href={"/contact"} className={styles.link}>
            contact
          </Link>
        </div>
        <div className={styles.iconContainer}>
          <Link href={"/user"} className={styles.link}>
            <FaRegUser size={20} />
          </Link>
          <button
            className={styles.cartButton}
            onClick={() => {
              context?.setCartState(true);
            }}
          >
            <FiShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
