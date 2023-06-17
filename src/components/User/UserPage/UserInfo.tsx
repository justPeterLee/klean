"use client";
import styles from "../../../styling/User.module.css";
import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { FavoriteContext } from "@/components/Context/FavoriteContext";

export function Favorites() {
  const { data: session } = useSession();
  const favoriteContext = useContext(FavoriteContext);

  return (
    <div className={styles.UserInfoContainer}>
      <span className={styles.InfoTitleContainer}>
        <p>Favorites</p>
      </span>
      <div>
        {/* {JSON.stringify(favoriteData)} */}
        {favoriteContext?.favorite ? (
          favoriteContext.favorite.length ? (
            favoriteContext?.favorite.map((item: any) => (
              <FavoriteItem
                key={item.id}
                name={item.productData.name}
                category={item.productData.category}
                price={item.productData.price}
              />
            ))
          ) : (
            <p>no favorites</p>
          )
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
