import Image from "next/image";
import styles from "../../styling/Admin.module.css";
import { useEffect, useState } from "react";

export default function AdminImagePreview({ images }: { images: Blob[] }) {
  let firstImage = images[0];
  const [currentImage, setCurrentImage] = useState<Blob>();
  const [imageArr, setImageArr] = useState<Blob[]>(images);
  const sendSubImage = (image: Blob) => {
    setCurrentImage(image);
  };

  useEffect(() => {
    if (images) {
      firstImage = images[0];
      const updatedArr = images.map((image: Blob) => image);
      setImageArr(updatedArr);
    }
  }, [images]);

  return (
    <div className={styles.imagePreviewContainer}>
      <div className={styles.subImageContainer}>
        {imageArr.map((image, index) => (
          <SubPreview
            key={index}
            subImage={image}
            sendSubImage={sendSubImage}
          />
        ))}
      </div>
      {imageArr.length ? (
        !currentImage ? (
          <img
            src={URL.createObjectURL(imageArr[0])}
            alt={"image"}
            width={420}
            height={400}
            className={styles.mainImage}
          />
        ) : (
          <img
            src={URL.createObjectURL(currentImage)}
            alt={"currentImage"}
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
  subImage: any;
  sendSubImage: (params: Blob) => void;
}) {
  return (
    <button
      className={styles.subImageButton}
      onClick={() => {
        sendSubImage(subImage);
      }}
    >
      <img
        src={URL.createObjectURL(subImage)}
        alt={subImage}
        width={65}
        height={65}
        className={styles.subImage}
      />
    </button>
  );
}
