import styles from "../../styling/Shop.module.css";
import { LoadingShopItem } from "@/components/ShopPage/ShopComponents";
export default function loading() {
  return (
    <div className={styles.ItemDisplayContainer}>
      <LoadingShopItem />
      <LoadingShopItem />
      <LoadingShopItem />
      <LoadingShopItem />
    </div>
  );
}
