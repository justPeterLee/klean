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
            favoriteContext?.favorite.map((item: any, index: number) => (
              <FavoriteItem
                key={item.id}
                name={item.productData.name}
                category={item.productData.category}
                price={item.productData.price}
                skuId={item.skuId}
                productId={item.productId}
                userId={session?.user.id}
                index={index}
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
  skuId: number;
  productId: number;
  userId: number;
  index: number;
}
function FavoriteItem(props: FavoriteItemProps) {
  const { name, category, price, skuId, productId, userId, index } = props;
  const favoriteContext = useContext(FavoriteContext);

  return (
    <div className={styles.FavoriteItemContainer}>
      <div className={styles.imageContainer}>
        {JSON.stringify(skuId)}
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
        <button
          style={
            !favoriteContext?.favorite[index].toBeDeleted
              ? { background: "rgb(200,200,200)" }
              : {}
          }
          onClick={async () => {
            if (favoriteContext?.favorite[index].toBeDeleted === false) {
              //proxy remove
              favoriteContext?.favoriteFunc?.proxyRemove(
                skuId,
                productId,
                false
              );
            } else {
              favoriteContext?.favoriteFunc?.proxyRemove(
                skuId,
                productId,
                true
              );
            }
          }}
        >
          {"<3"}
        </button>
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
