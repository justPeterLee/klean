import { ShopItemDisplay } from "@/components/ShopPage/ShopComponents";
import fetchImage from "../../../serverComponents/fetchImage";
import prisma from "../../../lib/db";

async function getAllProducts() {
  const productData = await prisma.product.findMany({
    include: {
      image: { where: { image_name: "thumbnail" } },
    },
  });

  const products = productData.map((product: any) => {
    return {
      id: product.id,
      name: product.product_name,
      price: product.product_price,
      image: product.image[0].image_file,
    };
  });

  return products;
}

export default async function Shop() {
  const products = await getAllProducts();

  const productImage = await Promise.all(
    products.map(async (product: any) => {
      const image = await fetchImage(product.image);
      return { ...product, imageUrl: image };
    })
  );

  return (
    <>
      <ShopItemDisplay items={productImage} />
    </>
  );
}
