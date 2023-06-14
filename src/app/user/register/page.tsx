import Register from "@/components/User/Register/Register";
import styles from "../../../styling/User.module.css";
export default async function register() {
  return (
    <div className={styles.main}>
      <Register />
    </div>
  );
}
