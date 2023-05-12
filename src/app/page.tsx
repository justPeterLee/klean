import styles from "../styling/page.module.css";

import { MainFeature, StoreFeature } from "@/components/Feature/Feature";

const items = [
  { id: 1, product_name: "product_1", product_image: "image", price: "$100" },
  { id: 2, product_name: "product_1", product_image: "image", price: "$100" },
  { id: 3, product_name: "product_1", product_image: "image", price: "$100" },
  { id: 4, product_name: "product_1", product_image: "image", price: "$100" },
  { id: 5, product_name: "product_1", product_image: "image", price: "$100" },
];
export default function Home() {
  return (
    <main className={styles.main}>
      <MainFeature />
      <StoreFeature caruselItem={items} />
    </main>
  );
}
