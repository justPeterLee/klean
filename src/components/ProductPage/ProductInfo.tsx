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

const dummyData = {
  name: "Product One",
  price: 120,
  category: "Computer Mouse",
  description:
    "A sleek computer mouse intended to match the sensation of a mechanical keyboard. Instead of the traditional mouse click, we used keyboard switches and caps to replace the traditional mouse click instead for a more familiar and unique experience.",
  technical: ["1200/1600 dpi", "white, tan, grey", "wireless/wired", "PET"],
};
export default function ProductInfo(props: ProductInfoProps) {
  return (
    <div className={styles.ProductInfoContainer}>
      {/* general information (name, price, category, favoirte(button)) */}
      <div className={styles.ProductGeneralContainer}>
        <span className={styles.NamePrice}>
          <p id={styles.name}>{dummyData.name}</p>
          <p id={styles.price}>${dummyData.price}</p>
        </span>

        <span className={styles.Category}>{dummyData.category}</span>

        <button className={styles.Favorite}>{"<3"}</button>
      </div>

      <LINEBREAK />
      {/* selection (selection, options) */}

      {/* description (description, technical points) */}
      <div className={styles.ProductDescriptionContainer}>
        <span className={styles.Description}>
          <p>{dummyData.description}</p>
        </span>
        <span className={styles.Technical}>
          <ul className={styles.TechnicalUl}>
            {dummyData.technical.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </span>
      </div>

      {/* review */}
    </div>
  );
}

function LINEBREAK() {
  return <div className={styles.line}></div>;
}
