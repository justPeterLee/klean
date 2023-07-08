"use client";
import styles from "../../styling/Product.module.css";
import { useState } from "react";
import Image from "next/image";
interface ProductImageProps {
  images: { name: string; file: string }[];
}

export default function ProductImage(props: ProductImageProps) {
  const { images } = props;
  const thumbnail = images.filter((image) => {
    return image.name === "thumbnail";
  })[0].file;

  const [mainImage, setMainImage] = useState(thumbnail);
  const [selected, setSelected] = useState(0);
  const readImage = (image: string) => {
    setMainImage(image);
  };

  return (
    <div className={styles.ImageContainer}>
      <div className={styles.SubImageContainer}>
        {images.length ? (
          images.map((image, index) => (
            <SubImage
              key={index}
              id={index}
              image={image.file}
              sendImage={readImage}
              sendSelected={(selected) => {
                setSelected(selected);
              }}
              selected={selected}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <div className={styles.MainImageContainer}>
        {/* <span className={styles.MainImage}>{mainImage}</span> */}
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
  sendImage: (params: string) => void;
  sendSelected: (params: number) => void;
}

function SubImage(props: SubImageProps) {
  const { image, id, selected, sendImage, sendSelected } = props;
  return (
    <button
      className={styles.SubImageButton}
      onClick={() => {
        sendImage(image);
        sendSelected(id);
      }}
      style={selected === id ? { border: "solid 2px black" } : {}}
    >
      <Image
        src={image}
        alt=""
        width={77}
        height={77}
        style={{ borderRadius: "10px" }}
      />
    </button>
  );
}
