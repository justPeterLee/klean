import styles from "../../../styling/Product.module.css";
import prisma from "../../../../lib/db";

import ProductImage from "@/components/ProductPage/ProductImage";
interface Props {
  params: { productId: string };
}

async function getProductDetail(productId: string) {
  const productData = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
    include: {
      review: true,
      technical_point: true,
      image: true,
      product_selection: { include: { product_option: true } },
      product_sku: true,
    },
  });

  console.log(productData);
}
export default async function ProductDetail({ params }: Props) {
  const productData = await getProductDetail(params.productId);
  return (
    <div className={styles.main}>
      <ProductImage />
    </div>
  );
}
