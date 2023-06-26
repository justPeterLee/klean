import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import styles from "../../../../styling/Review.module.css";

import ReviewRedirect from "@/components/ReviewPage/ReviewRedirect";
import ReviewForm from "@/components/ReviewPage/ReviewForm";

import prisma from "../../../../../lib/db";
import fetchImage from "../../../../../serverComponents/fetchImage";
import ReviewItem from "@/components/ReviewPage/ReviewItem";
async function fetchItem(params: number) {
  const res = await prisma.product.findFirst({
    where: { id: params },
    include: {
      product_category: { include: { category_ref: true } },
      image: { where: { image_name: "thumbnail" } },
    },
  });

  await prisma.$disconnect();

  const image = await fetchImage(res?.image[0].image_file!);

  const itemData = {
    id: res?.id,
    name: res?.product_name,
    category: res?.product_category[0].category_ref.category_description,
    price: res?.product_price,
    image: image,
  };
  return itemData;
}

export default async function reivew({
  params,
}: {
  params: { productId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <ReviewRedirect />;
  }

  const itemData = await fetchItem(parseInt(params.productId));
  return (
    <div className={styles.main}>
      {JSON.stringify(session)}
      <ReviewItem data={itemData!} />
      <ReviewForm
        name={session.user.name.split(" ")[0]}
        productId={parseInt(params.productId)}
      />
    </div>
  );
}
