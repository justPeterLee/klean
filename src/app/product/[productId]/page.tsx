import styles from "../../../styling/Product.module.css";
import prisma from "../../../../lib/db";

import ProductImage from "@/components/ProductPage/ProductImage";
import ProductInfo from "@/components/ProductPage/ProductInfo";
import { StoreCarouselClient } from "@/components/Feature/FeatureStoreItem/FeatureStoreItem";
import fetchImage from "../../../../serverComponents/fetchImage";

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
        categoryId: productData.product_category[0].category_id,
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
  const productData: any = await getProductDetail(params.productId);
  const imageFiles = await Promise.all(
    productData.images.map(async (imageObj: any) => {
      const image = await fetchImage(imageObj.image_file);
      return { file: image, name: imageObj.image_name };
    })
  );
  const productDataStruct = { ...productData, image_files: imageFiles };

  return (
    <div className={styles.main}>
      {productData && (
        <div className={styles.ProductInfo}>
          <ProductImage images={imageFiles} />
          <ProductInfo data={productDataStruct} />
        </div>
      )}

      <StoreCarouselClient catId={productData.categoryId} />
    </div>
  );
}
