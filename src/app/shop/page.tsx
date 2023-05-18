import styles from "../../styling/Shop.module.css";
import { ShopMenu } from "@/components/ShopPage/ShopComponents";

const categories = [
  { category: "Computer Mouse", link: "computer-mouse", amount: 5 },
  { category: "Mechanical Keyboard", link: "mechanical-keyboard", amount: 1 },
];
export default async function Shop() {
  return (
    <main className={styles.main}>
      <p>shop</p>
      <ShopMenu categories={categories} />
    </main>
  );
}
