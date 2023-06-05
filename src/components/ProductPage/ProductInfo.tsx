import styles from "../../styling/Product.module.css";

interface ProductInfoProps {
  data?: {
    name: string;
    price: number | string;
    category: string;
    description: string;
    technical: string[];
    review: {
      rate: string | number;
      date: string | Date;
      message: string;
      user?: string;
    };
    selection: any[];
  };
}
export default function ProductInfo(props: ProductInfoProps) {
  return (
    <div className={styles.ProductInfoContainer}>
      {/* general information (name, price, category, favoirte(button)) */}
      <div className={styles.ProductGeneralContainer}>
        <span className={styles.NamePrice}></span>
        <span className={styles.Category}></span>
        <button className={styles.Favorite}>{"<3"}</button>
      </div>

      {/* selection (selection, options) */}

      {/* description (description, technical points) */}
      <div className={styles.ProductDescriptionContainer}>
        <span className={styles.Description}>
          <p></p>
        </span>
        <span className={styles.Technical}>
          <ul className={styles.TechnicalUl}></ul>
        </span>
      </div>

      {/* review */}
    </div>
  );
}
