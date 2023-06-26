"use client";
import styles from "../../styling/Review.module.css";
import stylesC from "../../styling/Contact.module.css";

import { FavoriteItem } from "../User/UserPage/UserInfo";
import { InputValidation } from "../ContactPage/ContactForm";
import { LongInput } from "../AdminPage/AdminComponents";
import { useState } from "react";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export default function ReviewForm(props: { name: string }) {
  const [error, setError] = useState({
    name: true,
    starRating: true,
    message: true,
  });
  const [name, setName] = useState(props.name);
  const [starRating, setStarRating] = useState(0);
  const [proxyRating, setProxyRating] = useState(0);
  const [message, setMessage] = useState("");
  const ratingArr = [1, 2, 3, 4, 5];

  const postReivew = () => {
    // create error copy
    let proxyError = error;

    // create copy of values to see if valid
    const proxyValue: any = {
      name,
      starRating,
      message,
    };
    // create array of keys to be able to iterate
    const keys: string[] = Object.keys(proxyError);

    for (let key of keys) {
      if (
        proxyValue[key] === 0 ||
        !proxyValue[key].toString().replace(/\s/g, "")
      ) {
        proxyError = { ...proxyError, [key]: false };
        setError(proxyError);
      } else {
        proxyError = { ...proxyError, [key]: true };
        setError(proxyError);
      }
    }

    const value = Object.values(proxyError);
    if (!value.includes(false)) {
    } else {
      console.log("fail to create review");
    }
  };
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
          initialValue={props.name}
        />
      </div>
      <div className={styles.Rate}>
        <div className={styles.RateTitle}>
          <p style={!error.starRating ? { color: "red" } : {}}>Rating</p>
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

          {!error.starRating && (
            <p
              className={styles.errorText}
              style={{ color: "red", marginLeft: ".345rem" }}
            >
              * must include rating
            </p>
          )}
        </div>
      </div>
      <div className={styles.Message}>
        <div className={styles.RateTitle}>
          <p style={!error.message ? { color: "red" } : {}}>Message</p>
        </div>
        <LongInput
          error={error.message}
          readDescription={(params) => {
            setMessage(params);
          }}
        />
        {!error.message && (
          <p
            className={styles.errorText}
            style={{ color: "red", marginLeft: ".345rem" }}
          >
            * must include message
          </p>
        )}
      </div>

      <div className={styles.ButtonContainer}>
        <button className={styles.CreateButton} onClick={postReivew}>
          create
        </button>
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
