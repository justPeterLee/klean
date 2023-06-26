"use client";
import styles from "../../styling/Review.module.css";
import { FavoriteItem } from "../User/UserPage/UserInfo";
import { InputValidation } from "../ContactPage/ContactForm";
import { LongInput } from "../AdminPage/AdminComponents";
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
  const [message, setMessage] = useState("");
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
          width={{ width: "24rem" }}
          initialValue="User Name"
        />
      </div>
      <div className={styles.Rate}>
        <div className={styles.RateTitle}>
          <p>Rating</p>
          {starRating ? (
            <button
              onClick={() => {
                setStarRating(0);
                setProxyRating(0);
              }}
            >
              clear
            </button>
          ) : (
            <></>
          )}
        </div>

        <div>
          {ratingArr.map((pos) => {
            return (
              <StarRating
                key={pos}
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
      </div>
      <div className={styles.Message}>
        <div className={styles.RateTitle}>
          <p>Message</p>
        </div>
        <LongInput
          readDescription={(params) => {
            setMessage(params);
          }}
        />
      </div>

      <div className={styles.ButtonContainer}>
        <button className={styles.CreateButton}>create</button>
      </div>
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
      className={styles.StarButton}
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
      onMouseLeave={() => {
        sendProxyRating(0);
      }}
    >
      {postion <= curRating ? (
        <AiFillStar size={27} className={styles.Star} color="#FFCD3c" />
      ) : (
        <AiOutlineStar size={27} color="#FFCD3c" />
      )}
    </button>
  );
}
