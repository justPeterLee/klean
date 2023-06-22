import styles from "../styling/page.module.css";

import {
  MainFeature,
  SideFeature,
  ContactButton,
} from "@/components/Feature/Feature";
import {
  StoreFeature,
  StoreCarousel,
} from "@/components/Feature/FeatureStoreItem/FeatureStoreItem";
const items = [
  { id: 1, product_name: "product_1", product_image: "image", price: "$100" },
  { id: 2, product_name: "product_2", product_image: "image", price: "$100" },
  { id: 3, product_name: "product_3", product_image: "image", price: "$100" },
  { id: 4, product_name: "product_4", product_image: "image", price: "$100" },
  { id: 5, product_name: "product_5", product_image: "image", price: "$100" },
];

const itemss = [
  { id: 1, name: "product_1", image: "image", price: "$100" },
  { id: 2, name: "product_2", image: "image", price: "$100" },
  { id: 3, name: "product_3", image: "image", price: "$100" },
  { id: 4, name: "product_4", image: "image", price: "$100" },
  { id: 5, name: "product_5", image: "image", price: "$100" },
  { id: 6, name: "product_6", image: "image", price: "$100" },
  { id: 7, name: "product_7", image: "image", price: "$100" },
  { id: 8, name: "product_8", image: "image", price: "$100" },
  { id: 9, name: "product_9", image: "image", price: "$100" },
  { id: 10, name: "product_10", image: "image", price: "$100" },
  { id: 11, name: "product_11", image: "image", price: "$100" },
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
      <StoreCarousel data={itemss} />
      <SideFeature product_info={product_info1} />
      <SideFeature
        product_info={product_info1}
        styling={{
          featureBackgroundColor: "#F58800",
          lineColor: "#FFE3BF",
          productInfoLeft: "4rem",
          buttonPostionLeft: "6rem",
        }}
      />
      <ContactButton />
    </main>
  );
}
