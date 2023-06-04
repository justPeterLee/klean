import styles from "../../../styling/Product.module.css";

interface Props {
  params: { productId: number };
}
export default async function ProductDetail({ params }: Props) {
  return (
    <div className={styles.main}>
      <p>params: {params.productId}</p>
    </div>
  );
}
