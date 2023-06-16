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
        console.log(favoriteItems);
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
        <p>Favorites</p>
      </span>
      <div>
        {/* {JSON.stringify(favoriteData)} */}
        {favoriteData.length ? (
          favoriteData.map((item: any) => (
            <FavoriteItem
              key={item.id}
              name={item.productData.name}
              category={item.productData.category}
              price={item.productData.price}
            />
          ))
        ) : (
          <p>no favorites</p>
        )}
      </div>
    </div>
  );
}

interface FavoriteItemProps {
  name: string;
  category: string;
  price: string;
}
function FavoriteItem(props: FavoriteItemProps) {
  const { name, category, price } = props;
  return (
    <div className={styles.FavoriteItemContainer}>
      <div className={styles.imageContainer}>
        <span>image</span>
      </div>
      <div className={styles.FavoriteInfoContainer}>
        <span>
          <p>{name}</p>
          <p>{category}</p>
        </span>
        <span>
          <p>${price}</p>
        </span>
      </div>
      <div className={styles.FavoriteButton}>
        <button>{"<3"}</button>
      </div>
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
