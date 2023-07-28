import styles from "../../styling/Shop.module.css";
import prisma from "../../../lib/db";

// components
import { ShopMenu } from "@/components/ShopPage/ShopComponents";
import { product_category } from "@prisma/client";

interface ProductCategory {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  product_id: number;
  category_id: number;
  category_ref: {
    category_description: string;
    category_name: string;
  };
}
async function fetchMenuData() {
  const productCategory: ProductCategory[] =
    await prisma.product_category.findMany({
      include: {
        category_ref: {
          select: { category_description: true, category_name: true },
        },
      },
    });

  let sortedCategory: any = { ["All Products"]: 0 };

  productCategory.map((item: ProductCategory) => {
    if (!sortedCategory[item.category_ref.category_description]) {
      sortedCategory[item.category_ref.category_description] = {
        amount: 1,
        link: item.category_ref.category_name,
      };
    } else {
      sortedCategory[item.category_ref.category_description] = {
        amount: (sortedCategory[
          item.category_ref.category_description!
        ].amount += 1),
        link: item.category_ref.category_name,
      };
    }
    sortedCategory["All Products"] += 1;
  });

  return sortedCategory;
}

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuData = await fetchMenuData();

  return (
    <main className={styles.main}>
      <ShopMenu categories={menuData} all={menuData["All Products"]} />
      {children}
    </main>
  );
}
