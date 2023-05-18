import styles from "../../../styling/Shop.module.css";

interface Props {
  params: {
    category: string;
  };
}
export default async function ShopCategory({ params }: Props) {
  const category = params;
  return (
    <main className={styles.main}>
      <p>category: </p>
      <p>{category.category}</p>
    </main>
  );
}
