import styles from "../../styling/Shop.module.css";
import { ShopMenu } from "@/components/ShopPage/ShopComponents";

const categories = [
  { category: "Computer Mouse", link: "computer-mouse", amount: 5 },
  { category: "Mechanical Keyboard", link: "mechanical-keyboard", amount: 1 },
];

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      <ShopMenu categories={categories} />
      {children}
    </main>
  );
}
