import styles from "../../../styling/User.module.css";
import { signOut, useSession } from "next-auth/react";
export default function User() {
  const { data: session, status } = useSession();
  return (
    <div className={styles.UserContainer}>
      {/* {JSON.stringify(session)} */}
      <div className={styles.UsernamePlate}>
        <p>welcome, {session?.user.name}</p>
      </div>

      <div className={styles.UserIngo}></div>

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
