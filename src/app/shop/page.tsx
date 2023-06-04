import styles from "../../styling/Shop.module.css";
import { ShopItemDisplay } from "@/components/ShopPage/ShopComponents";
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
  return <ShopItemDisplay items={products} />;
}
