"use client";
import styles from "../../../styling/User.module.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function Favorites() {
  const { data: session } = useSession();

  const [error, setError] = useState(false);
  const [favoriteData, setFavoriteData] = useState([]);

  useEffect(() => {
    // GET request (favorite items)
    async function fetchFavorite() {
      try {
        const res = await fetch(`/api/favorite/${session?.user.id}`, {
          method: "POST",
          body: JSON.stringify(session?.user.id),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const favoriteItems = await res.json();
        setFavoriteData(favoriteItems);
        setError(false);
      } catch (err) {
        console.log("Error with fetching favorites: ", err);
        setError(true);
      }
    }

    fetchFavorite();
  }, []);
  return (
    <div className={styles.UserInfoContainer}>
      <span className={styles.InfoTitleContainer}>
        {JSON.stringify(favoriteData)}
        <p>Favorites</p>
      </span>
    </div>
  );
}

function FavoriteItem() {
  return (
    <div className={styles.UserInfoContainer}>
      <span className={styles.InfoTitleContainer}>
        <p>Favorites</p>
      </span>
    </div>
  );
}

export function Purchases() {
  return (
    <div className={styles.UserInfoContainer}>
      <span className={styles.InfoTitleContainer}>
        <p>Purchases</p>
      </span>
    </div>
  );
}

function PurchasesItem() {
  return (
    <div className={styles.UserInfoContainer}>
      <span className={styles.InfoTitleContainer}>
        <p>Purchases</p>
      </span>
    </div>
  );
}
