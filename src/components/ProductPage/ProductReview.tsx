import { useEffect, useState } from "react";
import styles from "../../styling/Product.module.css";
import { AiOutlineDown, AiFillStar, AiOutlineStar } from "react-icons/ai";
import prisma from "../../../lib/db";
import { useSession, getSession } from "next-auth/react";
interface ProductReviewProps {
  reviews: ReviewItemProps[];
}

export default function ProductReview(props: ProductReviewProps) {
  const [showReview, setShowReview] = useState(false);
  return (
    <div className={styles.ReviewContainer}>
      <button
        className={styles.ReviewButton}
        onClick={() => {
          setShowReview(!showReview);
        }}
      >
        <p>Reviews</p>
        <AiOutlineDown
          className={`${styles.ReviewArrow} ${showReview && styles.FlipArrow}`}
        />
      </button>
      <div
        className={`${styles.ReviewDisplay} ${
          showReview ? styles.ShowReviewDisplay : styles.HideReviewDisplay
        }`}
        style={showReview ? { display: "block" } : { display: "none" }}
      >
        {props.reviews.length ? (
          props.reviews.map((review) => (
            <ReviewItem
              key={review.id}
              id={review.id}
              user_name={review.user_name}
              review_date={review.createdAt!}
              review_rate={review.review_rate}
              review_message={review.review_message}
            />
          ))
        ) : (
          <p>no reviews</p>
        )}
        <AddReviewButton />
      </div>
    </div>
  );
}

interface ReviewItemProps {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  review_rate: number;
  review_date: Date;
  review_message: string | null;
  product_id?: number;
  user_name: string;
}
function ReviewItem(props: ReviewItemProps) {
  const { user_name, review_date, review_rate, review_message } = props;
  return (
    <div className={styles.ReviewItemContainer}>
      <div className={styles.ReviewUser}>
        <p>{user_name}</p>
        <p>{review_date.toLocaleString()}</p>
      </div>
      <div className={styles.ReviewRate}>
        <ReviewStars rate={review_rate} />
      </div>

      <div className={styles.ReviewMessage}>{review_message}</div>
    </div>
  );
}

function ReviewStars(props: { rate: number }) {
  const [stars, setStars] = useState<boolean[]>([]);
  useEffect(() => {
    let proxyArr: boolean[] = [];
    for (let i = 0; i < 5; i++) {
      if (i <= props.rate) {
        proxyArr.push(true);
      } else {
        proxyArr.push(false);
      }
    }
    setStars(proxyArr);
  }, []);
  return (
    <>
      {stars.length ? (
        stars.map((item, index) => {
          if (item) {
            return <AiFillStar key={index} />;
          } else {
            return <AiOutlineStar key={index} />;
          }
        })
      ) : (
        <>{props.rate}</>
      )}
    </>
  );
}

function AddReviewButton() {
  const { data: session, status } = useSession();
  return (
    <button
      onClick={() => {
        if (session) {
          console.log("logged in");
        } else {
          console.log("logged out");
        }
      }}
    >
      + add review
    </button>
  );
}
