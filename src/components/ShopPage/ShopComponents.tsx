import styles from "../../styling/Shop.module.css";

interface ShopMenuProps {
  categories: { category: string; link: string; amount: number }[];
}

export function ShopMenu(props: ShopMenuProps) {
  const { categories } = props;

  return (
    <span className={styles.MenuContainer}>
      {categories.map((category, index) => (
        <button key={index}>
          {category.category} ({category.amount})
        </button>
      ))}
    </span>
  );
}
