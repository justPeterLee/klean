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
              name={review.name}
              date={review.date}
              rate={review.rate}
              message={review.message}
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
  name: string;
  date: Date;
  rate: number;
  message: string;
}
function ReviewItem(props: ReviewItemProps) {
  const { name, date, rate, message } = props;
  return (
    <div className={styles.ReviewItemContainer}>
      <div className={styles.ReviewUser}>
        <p>{name}</p>
        <p>{date.toLocaleString()}</p>
      </div>
      <div className={styles.ReviewRate}>
        <ReviewStars rate={rate} />
      </div>

      <div className={styles.ReviewMessage}>{message}</div>
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
