"use client";
import styles from "../../styling/Product.module.css";
import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  images?: string[];
}

const imagesArr = [
  { name: "thumbnail", file: "image 1" },
  { name: "product-image", file: "image 2" },
  { name: "product-image", file: "image 3" },
  { name: "product-image", file: "image 4" },
  { name: "product-image", file: "image 5" },
  { name: "product-image", file: "image 6" },
];
export default function ProductImage(images: ProductImageProps) {
  const thumbnail = imagesArr.filter((image) => {
    return image.name === "thumbnail";
  })[0].file;

  const [mainImage, setMainImage] = useState(thumbnail);
  const readImage = (image: string) => {
    setMainImage(image);
  };

  return (
    <div className={styles.ImageContainer}>
      <div className={styles.SubImageContainer}>
        {imagesArr.length ? (
          imagesArr.map((image, index) => (
            <SubImage key={index} image={image.file} sendImage={readImage} />
          ))
        ) : (
          <></>
        )}
      </div>
      <div className={styles.MainImageContainer}>
        <span className={styles.MainImage}>{mainImage}</span>
      </div>
    </div>
  );
}

interface SubImageProps {
  image: string;
  sendImage: (params: string) => void;
}

function SubImage(props: SubImageProps) {
  const { image, sendImage } = props;
  return (
    <button
      className={styles.SubImageButton}
      onClick={() => {
        sendImage(image);
      }}
    >
      <span className={styles.SubImageImg}>{image}</span>
    </button>
  );
}
