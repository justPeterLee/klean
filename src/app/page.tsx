import AuthCheck from "@/components/AuthCheck/AuthCheck";
import styles from "./page.module.css";
import {
  SignInButton,
  SignOutButton,
} from "@/components/AuthButtons/AuthButtons";
import Login from "@/components/User/Login/Login";
import Register from "@/components/User/Register/Register";
export default function Home() {
  return (
    <main className={styles.main}>
      <p>hello</p>
      <Login />
      <Register />
      <SignInButton />
      <SignOutButton />
      <AuthCheck children={undefined} />
    </main>
  );
}
