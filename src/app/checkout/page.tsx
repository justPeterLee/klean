import styles from "../../styling/Checkout.module.css";
import CheckoutItem from "@/components/CheckoutPage/CheckoutItem";
import CheckoutPrice from "@/components/CheckoutPage/CheckoutPrice";
export default function Checkout() {
  return (
    <div className={styles.main}>
      <CheckoutItem />
      <CheckoutPrice />
    </div>
  );
}
