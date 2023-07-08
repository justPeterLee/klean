"use client";
import { useEffect, useState } from "react";
import styles from "../../styling/Shop.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
interface ShopMenuProps {
  categories: { category: string; link: string; amount: number }[];
  all: number;
}

export function ShopMenu(props: ShopMenuProps) {
  const { categories, all } = props;
  const router = useRouter();

  return (
    <span className={styles.MenuContainer}>
      <button
        onClick={() => {
          router.push(`/shop/`);
        }}
      >
        All Products ({all})
      </button>
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => {
            router.push(`/shop/${category.link}`);
          }}
        >
          {category.category} ({category.amount})
        </button>
      ))}
    </span>
  );
}

export function LoadingShopItem() {
  return (
    <div className={`${styles.ItemContainer}`}>
      <div className={`${styles.Image} ${styles.LoadingSkeleton}`}></div>
      <div className={`${styles.ItemInfo} ${styles.LoadingInfo}`}>
        <div className={styles.LoadingBar}></div>
        <div className={styles.LoadingBar} style={{ width: "13.8rem" }}></div>
      </div>
    </div>
  );
}
interface ShopItemProps {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
}

export function ShopItem({ id, name, price, imageUrl }: ShopItemProps) {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<any>("");

  useEffect(() => {
    // fetchImage();
    setImageSrc(imageUrl);
  }, []);
  return (
    <button
      className={styles.ItemContainer}
      onClick={() => {
        router.push(`/product/${id}`);
      }}
    >
      <div className={styles.Image}>
        <Image
          src={imageUrl}
          alt={""}
          className={styles.Image}
          width={100}
          height={100}
        />
      </div>
      <div className={styles.ItemInfo}>
        <p className={styles.Name}>{name}</p>
        <p className={styles.Price}>${price}</p>
      </div>
    </button>
  );
}

interface ShopItemDisplayProps {
  items: ShopItemProps[];
}
export function ShopItemDisplay({ items }: ShopItemDisplayProps) {
  return (
    <div className={styles.ItemDisplayContainer}>
      {items.length ? (
        items.map((item) => {
          return (
            <ShopItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          );
        })
      ) : (
        <p>no items</p>
      )}
    </div>
  );
}
