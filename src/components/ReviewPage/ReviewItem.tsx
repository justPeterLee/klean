import styles from "../../styling/Review.module.css";
import Image from "next/image";
interface ReviewItemProps {
  data: {
    id: number | undefined;
    name: string | undefined;
    category: any;
    price: number | undefined;
    image: string;
  };
}
export default function ReviewItem({
  data: { name, category, price, image },
}: ReviewItemProps) {
  return (
    <div className={styles.ReviewItemContainer}>
      <Image
        src={image}
        alt=""
        height={120}
        width={120}
        style={{ borderRadius: "10px" }}
      />
      <div className={styles.ReviewItemInfo}>
        <p className={styles.name}>{name}</p>
        <p className={styles.cat}>{category}</p>
        <p className={styles.price}>${price}</p>
      </div>
    </div>
  );
}
