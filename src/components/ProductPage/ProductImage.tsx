"use client";
import styles from "../../styling/Product.module.css";
import { useState } from "react";
import Image from "next/image";
interface ProductImageProps {
  images: { name: string; file: string; id: number }[];
}

export default function ProductImage(props: ProductImageProps) {
  const { images } = props;
  const thumbnail = images.filter((image) => {
    return image.name === "thumbnail";
  })[0];

  let orderImage: {
    id: number;
    name: string;
    file: string;
  }[] = [];

  images.map((image) => {
    if (image.name !== "thumbnail") {
      orderImage.push(image);
    } else {
      orderImage.unshift(image);
    }
  });

  const [mainImage, setMainImage] = useState(thumbnail.file);
  const [selected, setSelected] = useState(thumbnail.id);
  const readImage = (image: string, selected: number) => {
    setMainImage(image);
    setSelected(selected);
  };

  return (
    <div className={styles.ImageContainer}>
      <div className={styles.SubImageContainer}>
        {orderImage.length ? (
          orderImage.map((image) => (
            <SubImage
              key={image.id}
              id={image.id}
              image={image.file}
              sendImage={readImage}
              selected={selected}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <div className={styles.MainImageContainer}>
        <Image
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
  id: number;
  image: string;
  selected: number;
  sendImage: (image: string, selected: number) => void;
}

function SubImage(props: SubImageProps) {
  const { image, id, selected, sendImage } = props;
  return (
    <button
      className={styles.SubImageButton}
      onClick={() => {
        sendImage(image, id);
        // sendSelected(id);
      }}
    >
      <Image
        className={styles.SubImagePic}
        src={image}
        alt=""
        height={100}
        width={100}
        style={selected === id ? { filter: "brightness(0.5)" } : {}}
      />
    </button>
  );
}
