import styles from "../styling/page.module.css";
import prisma from "../../lib/db";
import fetchImage from "../../serverComponents/fetchImage";

// components
import {
  MainFeature,
  SideFeature,
  ContactButton,
} from "@/components/Feature/Feature";
import { StoreCarousel } from "@/components/GlobalComponent/CarouselItem.tsx/CarouselItem";

// GET carousel items (products)
async function getFeatureCarousel() {
  const res = await prisma.product.findMany({
    take: 11,
    include: {
      image: { where: { image_name: "thumbnail" } },
    },
  });

  const structureArr = await Promise.all(
    res.map(async (item) => {
      const image = await fetchImage(item.image[0].image_file!);
      return {
        id: item.id,
        name: item.product_name,
        image: image,
        price: item.product_price,
      };
    })
  );
  return structureArr;
}

// Get Feature Items (products)
const product_info1 = {
  id: 1,
  name: "ZenithX Pro-7",
  description:
    "Introducing the all-new ZenithX Pro-7, a revolutionary product that will transform your everyday life like never before. With its cutting-edge technology and sleek design.",
};

export default async function Home() {
  const caruselItems = await getFeatureCarousel();
  return (
    <main className={styles.main}>
      <MainFeature />
      <StoreCarousel data={caruselItems} />
      <SideFeature product_info={product_info1} />
      <SideFeature
        product_info={product_info1}
        styling={{
          featureBackgroundColor: "#F58800",
          lineColor: "#FFE3BF",
          productInfoLeft: "4rem",
          buttonPostionLeft: "6rem",
        }}
      />
      <ContactButton />
    </main>
  );
}
