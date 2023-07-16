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
    <div className={styles.ImageContainer}>
      <img
        src={URL.createObjectURL(image)}
        alt={`Selected Image ${0}`}
        height={580}
        className={styles.imageOne}
      />
      {/* <svg viewBox="0 0 1 1">
        <path
          d="M -40 -40 L -40 41 L 41 41 L 41 -40 Z M 0 .5 A .5 .5 0 0 0 1 .5 A .5 .5 0 0 0 0 .5 "
          fill="#202124 "
          fill-rule="evenodd"
          fill-opacity=".55"
        ></path>
        <path
          d="M -40 -40 L -40 41 L 41 41 L 41 -40 Z M 0 0 L 1 0 L 1 1 L 0 1 Z "
          fill="#202124 "
          fill-rule="evenodd"
          fill-opacity=".55"
        ></path>
      </svg> */}
    </div>
  );
}
