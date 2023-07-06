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

  const products = productData.map((product: any) => {
    const thumbnail = product.product_ref.image.filter((image: any) => {
      return image.image_name === "thumbnail";
    });

    return {
      id: product.product_ref.id,
      name: product.product_ref.product_name,
      price: product.product_ref.product_price,
      image: product.product_ref.image[0].image_file,
    };
  });

  return products;
}


export default async function ShopCategory({ params }: Props) {
  const productItems = await getItems(params.category);

  const productImage = await Promise.all(
    productItems.map(async (product: any) => {
      const image = await fetchImage(product.image);
      return { ...product, imageUrl: image };
    })
  );
  return <ShopItemDisplay items={productImage} />;
}
