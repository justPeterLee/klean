import styles from "../../styling/Product.module.css";
import { AiOutlineDown } from "react-icons/ai";

interface ProductReviewProps {
  reviews: ReviewItemProps[];
}
export default function ProductReview(props: ProductReviewProps) {
  return (
    <div className={styles.ReviewContainer}>
      <button className={styles.ReviewButton}>
        <p>Reviews</p>
        <AiOutlineDown />
      </button>
      <div className={styles.ReviewDisplay}>
        {props.reviews.length ? (
          props.reviews.map((review) => (
            <ReviewItem
              id={review.id}
              name={review.name}
              date={review.date}
              rate={review.rate}
              message={review.message}
            />
          ))
        ) : (
          <p>no reviews</p>
        )}
      </div>
    </div>
  );
}

interface ReviewItemProps {
  id: number;
  name: string;
  date: Date;
  rate: number;
  message: string;
}
function ReviewItem(props: ReviewItemProps) {
  const { name, date, rate, message } = props;
  return (
    <div className={styles.ReviewItemContainer}>
      <div className={styles.ReviewRate}>{rate}</div>
      <div className={styles.ReviewUser}>
        {name} {date.toLocaleString()}
      </div>
      <div className={styles.ReviewMessage}>{message}</div>
    </div>
  );
}
