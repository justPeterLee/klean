import Image from "next/image";
import styles from "../../styling/Admin.module.css";
import { useEffect, useState } from "react";

export default function AdminImagePreview({ images }: { images: string[] }) {
  let firstImage = images[0];
  const [currentImage, setCurrentImage] = useState<string>("");
  const sendSubImage = (image: string) => {
    setCurrentImage(image);
  };

  useEffect(() => {
    if (images) {
      firstImage = images[0];
    }
  }, [images]);

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
        <div className={styles.imagePreviewContainer}>
          <div className={styles.noImagePreviewSub} />
          <div className={styles.noImagePreview}>no images</div>
        </div>
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
        width={65}
        height={65}
        className={styles.subImage}
      />
    </button>
  );
}
