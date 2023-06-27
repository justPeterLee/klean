import styles from "../../styling/Loading.module.css";
import { AiOutlineLoading } from "react-icons/ai";

export function ApiRequestLoad() {
  return (
    <div className={styles.ApiReqLoadMain}>
      <div className={styles.ApiReqLoadContainer}>
        <AiOutlineLoading className={styles.ApiReqLoad} size={100} />
      </div>
    </div>
  );
}

export function RequestLoadBackDrop() {
  return <div className={styles.Backdrop}></div>;
}
