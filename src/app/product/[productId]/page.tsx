import styles from "../../../styling/Product.module.css";
import prisma from "../../../../lib/db";

import ProductImage from "@/components/ProductPage/ProductImage";
import ProductInfo from "@/components/ProductPage/ProductInfo";
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
      product_category: {
        include: {
          category_ref: true,
        },
      },
    },
  });

  console.log(
    productData?.product_category[0].category_ref.category_description
  );
  const data = productData
    ? {
        id: productData.id,
        name: productData.product_name,
        price: productData.product_price,
        category:
          productData.product_category[0].category_ref.category_description,
        description: productData.product_description,
        technical: productData.technical_point,
        selection: productData.product_selection,
        SKUs: productData.product_sku,
        images: productData.image,
        review: productData.review,
      }
    : false;
  return data;
}
export default async function ProductDetail({ params }: Props) {
  const productData = await getProductDetail(params.productId);
  return (
    <div className={styles.main}>
      {productData && (
        <div className={styles.ProductInfo}>
          <ProductImage />
          <ProductInfo data={productData} />
        </div>
      )}
    </div>
  );
}
