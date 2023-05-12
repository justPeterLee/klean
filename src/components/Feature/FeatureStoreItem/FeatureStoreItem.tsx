import styles from "../Feature.module.css";

interface FeatureStoreItem {
  id: number;
  name: string;
  price: string;
  image?: string;
}
export default function FeatureStoreItem(props: FeatureStoreItem) {
  const { id, name, price, image } = props;
  return (
    <div className={styles.StoreItemContainer}>
      <button className={styles.StoreItemImage}>image</button>
      <div className={styles.StoreItemInfo}>
        <p>{name}</p> <p>{price}</p>
      </div>
    </div>
  );
}
