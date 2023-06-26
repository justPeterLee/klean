"use client";
import styles from "../../styling/Review.module.css";
import { FavoriteItem } from "../User/UserPage/UserInfo";
import { InputValidation } from "../ContactPage/ContactForm";
import { useState } from "react";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export default function ReviewForm() {
  const [error, setError] = useState({
    name: true,
    password: true,
  });
  const [name, setName] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [proxyRating, setProxyRating] = useState(0);

  const ratingArr = [1, 2, 3, 4, 5];
  return (
    <div className={styles.FormContainer}>
      <div className={styles.FormNameDate}>
        <InputValidation
          valueName="Name"
          triggerError={error.name}
          errorMessage="must include name"
          sendValue={(value) => {
            // setName(value);
            setName(value);
          }}
          characterLimit={40}
          width={{ width: "20rem" }}
          initialValue=""
        />
      </div>
      <div className={styles.Rate}>
        {JSON.stringify(proxyRating)}
        {JSON.stringify(starRating)}
        {ratingArr.map((pos) => {
          return (
            <StarRating
              postion={pos}
              curRating={starRating}
              proxyRating={proxyRating}
              sendCurrentRating={(curRating) => {
                setStarRating(curRating);
              }}
              sendProxyRating={(proxyRating) => {
                setProxyRating(proxyRating);
              }}
            />
          );
        })}
      </div>
      <div className={styles.Message}></div>
    </div>
  );
}

interface StartRatingProps {
  postion: number;
  curRating: number;
  proxyRating: number;

  sendCurrentRating: (param: number) => void;
  sendProxyRating: (param: number) => void;
}
function StarRating({
  postion,
  curRating,
  proxyRating,
  sendCurrentRating,
  sendProxyRating,
}: StartRatingProps) {
  return (
    <button
      onClick={() => {
        sendCurrentRating(postion);
      }}
      onMouseOver={() => {
        if (postion > curRating) {
          sendProxyRating(postion);
        }
      }}
      onMouseOut={() => {
        sendProxyRating(0);
      }}
    >
      {postion <= curRating ? (
        <AiFillStar />
      ) : postion <= proxyRating ? (
        postion > curRating ? (
          <AiFillStar color="blue" />
        ) : (
          <AiOutlineStar />
        )
      ) : (
        <AiOutlineStar />
      )}
    </button>
  );
}
