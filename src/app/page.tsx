import styles from "../styling/page.module.css";

import { MainFeature } from "@/components/Feature/Feature";
export default function Home() {
  return (
    <main className={styles.main}>
      <MainFeature />
    </main>
  );
}
