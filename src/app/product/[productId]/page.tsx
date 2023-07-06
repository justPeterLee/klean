import styles from "../../../styling/Product.module.css";
import prisma from "../../../../lib/db";

import ProductImage from "@/components/ProductPage/ProductImage";
import ProductInfo from "@/components/ProductPage/ProductInfo";
import { StoreCarousel } from "@/components/Feature/FeatureStoreItem/FeatureStoreItem";
import fetchImage from "../../../../serverComponents/fetchImage";

const itemss = [
  { id: 1, name: "product_1", image: "image", price: 100 },
  { id: 2, name: "product_2", image: "image", price: 100 },
  { id: 3, name: "product_3", image: "image", price: 100 },
  { id: 4, name: "product_4", image: "image", price: 100 },
  { id: 5, name: "product_5", image: "image", price: 100 },
  { id: 6, name: "product_6", image: "image", price: 100 },
  { id: 7, name: "product_7", image: "image", price: 100 },
  { id: 8, name: "product_8", image: "image", price: 100 },
  { id: 9, name: "product_9", image: "image", price: 100 },
  { id: 10, name: "product_10", image: "image", price: 100 },
  { id: 11, name: "product_11", image: "image", price: 100 },
];

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

async function ProductReview(productId: string) {
  const productReview = await prisma.review.findMany({
    where: { product_id: parseInt(productId) },
    take: 3,
  });

  return productReview;
}

export default async function ProductDetail({ params }: Props) {
  const productData: any = await getProductDetail(params.productId);
  const imageFiles = await Promise.all(
    productData.images.map(async (imageObj: any) => {
      const image = await fetchImage(imageObj.image_file);
      return { file: image, name: imageObj.image_name };
    })
  );
  const productDataStruct = { ...productData, image_files: imageFiles };
  const productReview = await ProductReview(params.productId);
  return (
    <div className={styles.main}>
      {productData && (
        <div className={styles.ProductInfo}>
          <ProductImage images={imageFiles} />
          <ProductInfo data={productDataStruct} review={productReview} />
        </div>
      )}

      <StoreCarousel data={itemss} />
    </div>
  );
}
