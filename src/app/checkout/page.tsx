import styles from "../../styling/Checkout.module.css";
import CheckoutItem from "@/components/CheckoutPage/CheckoutItem";
export default function Checkout() {
  return (
    <div className={styles.main}>
      <CheckoutItem />
    </div>
  );
}
