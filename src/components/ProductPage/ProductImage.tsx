import styles from "../../styling/Product.module.css";
import Image from "next/image";

interface ProductImageProps {
  images?: string[];
}

export default function ProductImage(images: ProductImageProps) {
  return (
    <div className={styles.ImageContainer}>
      <div className={styles.SubImageContainer}></div>
      <div className={styles.MainImageContainer}></div>
    </div>
  );
}
