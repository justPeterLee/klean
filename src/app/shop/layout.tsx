import styles from "../../styling/Shop.module.css";
import { ShopMenu } from "@/components/ShopPage/ShopComponents";

import prisma from "../../../lib/db";

async function fetchCategories() {
  const responseCategories = await prisma.category.findMany();
  const categories = await responseCategories;
  const structuredCategories = fetchCategoriesAmount(categories);
  return structuredCategories;
}

async function fetchCategoriesAmount(categoryArr: any[]) {
  const categoryPromises = categoryArr.map(async (category: any) => {
    const amount = await prisma.product_category.count({
      where: {
        category_id: category.id,
      },
    });
    return {
      category: category.category_description,
      link: category.category_name,
      amount: amount,
    };
  });

  const categoryAmount = await Promise.all(categoryPromises);
  return categoryAmount;
}

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dbCategories = await fetchCategories();

  return (
    <main className={styles.main}>
      <ShopMenu categories={dbCategories} />
      {children}
    </main>
  );
}
