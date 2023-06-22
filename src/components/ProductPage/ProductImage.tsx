"use client";
import styles from "../../styling/Product.module.css";
import { useState } from "react";

interface ProductImageProps {
  images: { name: string; file: string }[];
}

export default function ProductImage(props: ProductImageProps) {
  const { images } = props;
  const thumbnail = images.filter((image) => {
    return image.name === "thumbnail";
  })[0].file;

  const [mainImage, setMainImage] = useState(thumbnail);
  const readImage = (image: string) => {
    setMainImage(image);
  };

  return (
    <div className={styles.ImageContainer}>
      <div className={styles.SubImageContainer}>
        {images.length ? (
          images.map((image, index) => (
            <SubImage key={index} image={image.file} sendImage={readImage} />
          ))
        ) : (
          <></>
        )}
      </div>
      <div className={styles.MainImageContainer}>
        {/* <span className={styles.MainImage}>{mainImage}</span> */}
        <img
          src={mainImage}
          alt=""
          width={480}
          height={560}
          style={{ borderRadius: "10px" }}
        />
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
      <img
        src={image}
        alt=""
        width={80}
        height={80}
        style={{ borderRadius: "10px" }}
      />
    </button>
  );
}
