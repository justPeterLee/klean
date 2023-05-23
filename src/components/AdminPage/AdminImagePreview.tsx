import Image from "next/image";
import styles from "../../styling/Admin.module.css";
import { useState } from "react";

export default function AdminImagePreview({ images }: { images: string[] }) {
  const firstImage = images[0];
  const [currentImage, setCurrentImage] = useState<string>("");
  const sendSubImage = (image: string) => {
    setCurrentImage(image);
  };
  return (
    <div className={styles.imagePreviewContainer}>
      <div className={styles.subImageContainer}>
        {images.map((image, index) => (
          <SubPreview
            key={index}
            subImage={image}
            sendSubImage={sendSubImage}
          />
        ))}
      </div>
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
            width={420}
            height={400}
            className={styles.mainImage}
          />
        )
      ) : (
        <></>
      )}
    </div>
  );
}

function SubPreview({
  subImage,
  sendSubImage,
}: {
  subImage: string;
  sendSubImage: (params: string) => void;
}) {
  return (
    <button
      className={styles.subImageButton}
      onClick={() => {
        sendSubImage(subImage);
      }}
    >
      <Image
        src={`/uploads/${subImage}`}
        alt={subImage}
        width={70}
        height={70}
        className={styles.subImage}
      />
    </button>
  );
}
