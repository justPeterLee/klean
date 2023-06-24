"use client";
import styles from "../../../styling/User.module.css";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { FavoriteContext } from "@/components/Context/FavoriteContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
export function Favorites() {
  const { data: session } = useSession();
  const favoriteContext = useContext(FavoriteContext);

  return (
    <div className={styles.UserInfoContainer}>
      <span className={styles.InfoTitleContainer}>
        <p>Favorites</p>
      </span>
      <div className={styles.FavoriteDisplay}>
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
        <div className={styles.FavoriteImage}>image</div>
      </div>
      <div className={styles.FavoriteInfoContainer}>
        <span>
          <p className={styles.FavName}>{name}</p>
          <p className={styles.FavCat}>{category}</p>
        </span>
        <span className={styles.FavPriceContainer}>
          <p>${price}</p>
        </span>
      </div>
      <div className={styles.FavoriteButton}>
        <button
          className={styles.FavButton}
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
          {!favoriteContext?.favorite[index].toBeDeleted ? (
            <AiFillHeart size={30} color="rgb(200,100,100)" />
          ) : (
            <AiOutlineHeart size={30} color="rgb(200,100,100)" />
          )}
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
