"use client";
import styles from "../../../styling/Admin.module.css";
import Link from "next/link";
import { CreateForm } from "@/components/AdminPage/AdminComponents";
export default function AdminCreate() {
  return (
    <div className={styles.main}>
      <p>create</p>
      <CreateForm />
    </div>
  );
}
