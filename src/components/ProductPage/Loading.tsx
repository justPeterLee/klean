import styles from "../../styling/Product.module.css";

export function ProductImageLoading() {
  const subArr = [1, 2, 3, 4, 5, 6];
  return (
    <div className={styles.ImageContainer}>
      <div className={styles.SubImageContainer}>
        {subArr.map((item) => (
          <div
            key={item}
            className={`${styles.SubImageButton} ${styles.LoadingAnimation}`}
          />
        ))}
      </div>
      <div className={`${styles.MainImageLoading}`}>
        {/* <span className={`${styles.LoadingAnimation}`}></span> */}
      </div>
    </div>
  );
}
