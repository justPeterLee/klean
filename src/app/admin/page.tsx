import styles from "../../styling/Admin.module.css";
import Link from "next/link";

export default async function Admin() {
  return (
    <div className={styles.main}>
      <Link href={"/admin/create"}>create</Link>
    </div>
  );
}
