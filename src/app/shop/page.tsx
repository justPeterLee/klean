import fetchImage from "../../../serverComponents/fetchImage";
import prisma from "../../../lib/db";

// components
import { ShopItemDisplay } from "@/components/ShopPage/ShopComponents";
// GET all products
async function getAllProducts() {
  const productData = await prisma.product.findMany({
    include: {
      image: { where: { image_name: "thumbnail" } },
    },
  });

  const products = await Promise.all(
    productData.map(async (product: any) => {
      const image = await fetchImage(product.image[0].image_file);
      return {
        id: product.id,
        name: product.product_name,
        price: product.product_price,
        imageUrl: image,
      };
    })
  );

  return products;
}

export default async function Shop() {
  const products = await getAllProducts();

  return (
    <>
      <ShopItemDisplay items={products} />
    </>
  );
}
