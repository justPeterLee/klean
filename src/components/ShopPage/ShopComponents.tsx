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

interface ShopItemProps {
  id: string;
  image: string;
  name: string;
  price: string;
}

export function ShopItem({ id, image, name, price }: ShopItemProps) {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<any>("");

  const fetchImage = async () => {
    const res: any = await fetch(`/api/fetchImageProduct/${image}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      setImageSrc(await response.json());
    });
  };

  useEffect(() => {
    fetchImage();
  }, []);
  return (
    <button
      className={styles.ItemContainer}
      onClick={() => {
        router.push(`/product/${id}`);
      }}
    >
      <div className={styles.Image}>
        <img src={imageSrc} alt={""} className={styles.Image} />
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
              image={item.image}
            />
          );
        })
      ) : (
        <p>no items</p>
      )}
    </div>
  );
}
