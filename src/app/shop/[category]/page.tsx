import styles from "../../../styling/Shop.module.css";
import { ShopItemDisplay } from "@/components/ShopPage/ShopComponents";
import prisma from "../../../../lib/db";

interface Props {
  params: {
    category: string;
  };
}

const items = [
  { id: "1", name: "mouse 1", price: "$200", image: "image" },
  { id: "2", name: "mouse 1", price: "$200", image: "image" },
  { id: "3", name: "mouse 1", price: "$200", image: "image" },
  { id: "4", name: "mouse 1", price: "$200", image: "image" },
  { id: "5", name: "mouse 1", price: "$200", image: "image" },
  { id: "6", name: "mouse 1", price: "$200", image: "image" },
];

async function getItems(params: string) {
  const categoryId = await prisma.category.findFirst({
    where: {
      category_name: params,
    },
    select: {
      id: true,
    },
  });

  const productData = await prisma.product_category.findMany({
    where: {
      category_id: categoryId?.id,
    },
    include: {
      product_ref: {
        include: {
          image: true,
        },
      },
    },
  });

  const products = productData.map((product: any) => {
    const thumbnail = product.product_ref.image.filter((image: any) => {
      return image.image_name === "thumbnail";
    });

    return {
      id: product.product_ref.id,
      name: product.product_ref.product_name,
      price: product.product_ref.product_price,
      image: thumbnail[0].image_file,
    };
  });

  return products;
}

export default async function ShopCategory({ params }: Props) {
  const productItems = await getItems(params.category);
  const { category } = params;
  return <ShopItemDisplay items={productItems} />;
}
