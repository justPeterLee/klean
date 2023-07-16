import styles from "./ImageMainpulation.module.css";
import { AiOutlinePlus } from "react-icons/ai";

export function ImageMainpulation() {
  return (
    <div className={styles.ImageMainpulationContainer}>
      <div className={styles.ImageMainpulation}>
        <button className={styles.cancelButton}>
          <AiOutlinePlus className={styles.X} />
        </button>

        <button className={styles.saveButton}>
          <p>Save</p>
        </button>
      </div>
    </div>
  );
}
