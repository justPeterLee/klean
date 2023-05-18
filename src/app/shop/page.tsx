import styles from "../../styling/Shop.module.css";
import { ShopItemDisplay } from "@/components/ShopPage/ShopComponents";

const items = [
  { id: "1", name: "mouse 1", price: "$200", image: "image" },
  { id: "2", name: "mouse 1", price: "$200", image: "image" },
  { id: "3", name: "mouse 1", price: "$200", image: "image" },
  { id: "4", name: "mouse 1", price: "$200", image: "image" },
  { id: "5", name: "mouse 1", price: "$200", image: "image" },
  { id: "6", name: "mouse 1", price: "$200", image: "image" },
];

export default async function Shop() {
  return (
    <main className={styles.main}>
      <ShopItemDisplay items={items} />
    </main>
  );
}
