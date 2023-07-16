import styles from "./ImageMainpulation.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";
interface ImageManipulationProps {
  hide: () => void;
  image: any;
}
export function ImageMainpulation({ hide, image }: ImageManipulationProps) {
  return (
    <div className={styles.ImageMainpulationContainer}>
      <div className={styles.ImageMainpulation}>
        <ImageManipulationButton hide={hide} />

        <ImageManipulationImage image={image} />
      </div>
    </div>
  );
}

function ImageManipulationButton({ hide }: { hide: () => void }) {
  return (
    <>
      <button
        className={styles.cancelButton}
        onClick={() => {
          hide();
        }}
      >
        <AiOutlinePlus className={styles.X} />
      </button>
      <button
        className={styles.saveButton}
        onClick={() => {
          hide();
        }}
      >
        <p>Save</p>
      </button>
    </>
  );
}

function ImageManipulationImage({ image }: { image: any }) {
  return (
    <div>
      <img
        src={URL.createObjectURL(image)}
        alt={`Selected Image ${0}`}
        height={580}
        className={styles.imageOne}
      />
    </div>
  );
}
