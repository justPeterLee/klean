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
    <div>
      <p>product info</p>
    </div>
  );
}
