import Image from "next/image";
import styles from "../../styling/Admin.module.css";
import { useState } from "react";

export default function AdminImagePreview({ images }: { images: string[] }) {
  const firstImage = images[0];
  const [currentImage, setCurrentImage] = useState<string>();

  return (
    <div className={styles.imagePreviewContainer}>
      <p>{JSON.stringify(currentImage)}</p>
      <div className={styles.subImages}></div>
      {images.length ? (
        !currentImage ? (
          <Image
            src={`/uploads/${images[0]}`}
            alt={images[0]}
            width={420}
            height={400}
            className={styles.mainImage}
          />
        ) : (
          <Image
            src={`/uploads/${currentImage}`}
            alt={currentImage}
            width={130}
            height={100}
            className={styles.mainImage}
          />
        )
      ) : (
        <></>
      )}
    </div>
  );
}
