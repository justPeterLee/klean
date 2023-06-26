"use client";
import styles from "../../styling/Review.module.css";
import { useRouter } from "next/navigation";
export default function ReviewRedirect() {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <button
        onClick={() => {
          router.push("/user/login");
        }}
      >
        login
      </button>
    </div>
  );
}
