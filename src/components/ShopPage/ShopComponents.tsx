"use client";
import styles from "../../styling/Shop.module.css";
import { useRouter } from "next/navigation";
interface ShopMenuProps {
  categories: { category: string; link: string; amount: number }[];
}

export function ShopMenu(props: ShopMenuProps) {
  const { categories } = props;
  const router = useRouter();

  return (
    <span className={styles.MenuContainer}>
      <button
        onClick={() => {
          router.push(`/shop/`);
        }}
      >
        All Products (6)
      </button>
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => {
            router.push(`/shop/${category.link}`);
          }}
        >
          {category.category} ({category.amount})
        </button>
      ))}
    </span>
  );
}
