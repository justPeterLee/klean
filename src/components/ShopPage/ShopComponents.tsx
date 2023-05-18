import { category } from "@prisma/client";
import styles from "../../styling/Shop.module.css";

interface ShopMenuProps {
  categories: [{ category: string; link: string }];
}

export default function ShopMenu(props: ShopMenuProps) {
  const { categories } = props;

  return (
    <span className={styles.MenuContainer}>
      {categories.map((category, index) => (
        <p key={index}>{category.category}</p>
      ))}
    </span>
  );
}
