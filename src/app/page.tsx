import styles from "./page.module.css";
import {
  SignInButton,
  SignOutButton,
} from "@/components/AuthButtons/AuthButtons";
export default function Home() {
  return (
    <main className={styles.main}>
      <p>hello</p>
      <SignInButton />
      <SignOutButton />
    </main>
  );
}
