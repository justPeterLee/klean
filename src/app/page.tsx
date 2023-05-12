import styles from "../styling/page.module.css";

import {
  MainFeature,
  StoreFeature,
  SideFeature,
} from "@/components/Feature/Feature";

const items = [
  { id: 1, product_name: "product_1", product_image: "image", price: "$100" },
  { id: 2, product_name: "product_1", product_image: "image", price: "$100" },
  { id: 3, product_name: "product_1", product_image: "image", price: "$100" },
  { id: 4, product_name: "product_1", product_image: "image", price: "$100" },
  { id: 5, product_name: "product_1", product_image: "image", price: "$100" },
];

const product_info1 = {
  id: 1,
  name: "ZenithX Pro-7",
  description:
    "Introducing the all-new ZenithX Pro-7, a revolutionary product that will transform your everyday life like never before. With its cutting-edge technology and sleek design.",
};
export default function Home() {
  return (
    <main className={styles.main}>
      <MainFeature />
      <StoreFeature caruselItem={items} />
      <SideFeature product_info={product_info1} />
    </main>
  );
}
