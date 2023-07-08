import styles from "../../styling/Product.module.css";
import { ProductImageLoading } from "@/components/ProductPage/Loading";
export default function loading() {
  return (
    <div className={styles.main}>
      <ProductImageLoading />
    </div>
  );
}
