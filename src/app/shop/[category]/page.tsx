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

  console.log(categoryId);

  const products = await prisma.product_category.findMany({
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

  console.log(products);
}
export default async function ShopCategory({ params }: Props) {
  getItems(params.category);
  const { category } = params;
  return <ShopItemDisplay items={items} />;
}
