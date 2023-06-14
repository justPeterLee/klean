import Login from "@/components/User/Login/Login";
import styles from "../../../styling/User.module.css";
export default async function login() {
  return (
    <div className={styles.main}>
      <Login />
    </div>
  );
}
