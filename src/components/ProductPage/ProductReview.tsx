import { useEffect, useState } from "react";
import styles from "../../styling/Product.module.css";
import {
  AiOutlineDown,
  AiFillStar,
  AiOutlineStar,
  AiOutlineLoading,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
interface ProductReviewProps {
  reviews?: ReviewItemProps[];
  productId: number;
}

export default function ProductReview(props: ProductReviewProps) {
  const [showReview, setShowReview] = useState(false);
  const [showMoreReview, setShowMoreReview] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [initalReview, setInitalReview] = useState([]);
  const fetchInitalReview = async () => {
    await fetch(`/api/review/inital/${props.productId}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    }).then(async (response) => {
      const data = await response.json();
      console.log(data);
      setInitalReview(data);
      setLoading(false);
    });
  };
  return (
    <div className={styles.ReviewContainer}>
      <button
        className={styles.ReviewButton}
        onClick={() => {
          setShowReview(!showReview);
          if (loading) {
            fetchInitalReview();
          }
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
        {loading ? (
          <p>loading...</p>
        ) : initalReview.length ? (
          initalReview.map((review: any) => (
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

        {showMoreReview.length ? (
          showMoreReview.map((review) => (
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
          <></>
        )}

        <div className={styles.ActionReviewButton}>
          {initalReview.length ? (
            <ShowMoreButton
              productId={props.productId}
              readShowReview={(newReview: any) => {
                setShowMoreReview(newReview);
              }}
            />
          ) : (
            <></>
          )}

          <AddReviewButton productId={props.productId} />
        </div>
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
  const date = review_date;
  return (
    <div className={styles.ReviewItemContainer}>
      <div className={styles.ReviewUser}>
        <p>{user_name}</p>
        <p>{review_date.toString().slice(0, 10)}</p>
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

function AddReviewButton(props: { productId: number }) {
  const router = useRouter();
  return (
    <button
      className={styles.ReviewAdd}
      onClick={() => {
        router.push(`product/${props.productId}/review`);
      }}
    >
      + add review
    </button>
  );
}

interface ShowMoreButtonProps {
  productId: any;
  readShowReview: (newReview: any) => void;
}
function ShowMoreButton({ productId, readShowReview }: ShowMoreButtonProps) {
  const [pageNumber, setPageNumber] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const [showReview, setShowReview] = useState<any[]>([1, 2, 3, 4]);

  const sendShowReview = (newReview: any[]) => {
    setShowReview(newReview);
    setPageNumber(pageNumber + 1);
    setLoading(false);
    readShowReview(newReview);
  };
  const fetchReviewPagination = async () => {
    setLoading(true);
    const res = await fetch(`/api/review/${productId}`, {
      method: "POST",
      body: JSON.stringify({ productId, pageNumber }),
      headers: {
        "content-type": "application/json",
      },
    }).then(async (response) => {
      const newReviews = await response.json();
      sendShowReview(newReviews);
      console.log(newReviews);
    });
  };

  useEffect(() => {
    if (showReview.length !== 4) {
      setHide(true);
    }
  }, [showReview]);
  return (
    <button
      className={styles.ShowMoreButton}
      onClick={fetchReviewPagination}
      disabled={loading || showReview.length !== 4}
      style={hide ? { visibility: "hidden" } : {}}
    >
      <p>show more</p>

      {loading && <AiOutlineLoading className={styles.ShowMoreLoading} />}
    </button>
  );
}
