import { ShopItemDisplay } from "@/components/ShopPage/ShopComponents";
import prisma from "../../../../lib/db";
import fetchImage from "../../../../serverComponents/fetchImage";

interface Props {
  params: {
    category: string;
  };
}

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
          image: { where: { image_name: "thumbnail" } },
        },
      },
    },
  });

  const products = await Promise.all(
    productData.map(async (product: any) => {
      const image = await fetchImage(product.product_ref.image[0].image_file);
      return {
        id: product.product_ref.id,
        name: product.product_ref.product_name,
        price: product.product_ref.product_price,
        imageUrl: image,
      };
    })
  );

  return products;
}

export default async function ShopCategory({ params }: Props) {
  const productItems = await getItems(params.category);

  return <ShopItemDisplay items={productItems} />;
}
