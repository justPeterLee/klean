"use client";
import styles from "./CarouselItem.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import Image from "next/image";
import { LoadingShopItem } from "@/components/ShopPage/ShopComponents";
interface CaruselData {
  id: number;
  name: string;
  price: number;
  image: string;
}
interface StoreCarouselProps {
  data: CaruselData[];
  setData?: () => any;
}
interface StoreCarouselItem {
  id: number;
  name: string;
  price: number | null;
  image: string;
}

export function StoreCarouselClient(props: { catId: number }) {
  const [caruselData, setCaruselData] = useState<CaruselData[]>([]);

  const fetchDatas = async () => {
    await fetch(`/api/carusel/${props.catId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      const data = await response.json();
      setCaruselData(data);
    });
  };
  return <StoreCarousel data={caruselData} setData={fetchDatas} />;
}

export function StoreCarousel(props: StoreCarouselProps) {
  const { data } = props;

  const [containerRef, isVisible] = useElementOnScreen({});
  const [clickPos, setClickPos] = useState(0);
  const [transitionPos, setTransitionPos] = useState(0);

  const [loading, setLoading] = useState(true);

  const transitionPerItem = 16.8;
  const minClick = 0;
  const maxClick = Math.floor(data.length / 3);
  const lastClick =
    (data.length - Math.floor(data.length / 3) * 3) * transitionPerItem; // multpily by per trans (33.6)

  const moveLeft = () => {
    if (clickPos > minClick) {
      setClickPos(clickPos - 1);
      if (clickPos === minClick + 1) {
        setTransitionPos(0);
      } else {
        setTransitionPos(transitionPos - transitionPerItem * 3);
      }
    }
  };

  const moveRight = () => {
    if (clickPos < maxClick) {
      setClickPos(clickPos + 1);
      if (clickPos === maxClick - 1) {
        setTransitionPos(transitionPos + lastClick);
      } else {
        setTransitionPos(transitionPos + transitionPerItem * 3);
      }
    }
  };

  useEffect(() => {
    if (isVisible && props.setData) {
      props.setData().then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [isVisible]);

  return (
    <div className={styles.CaruselContainer} ref={containerRef}>
      <button
        className={styles.CaruselButton}
        style={{ left: "-5rem" }}
        onClick={moveLeft}
      >
        {"<"}
      </button>

      <div className={styles.CaruselDisplay}>
        <div
          className={`${styles.CaruselDisplaySub}`}
          style={{ transform: `translateX(-${transitionPos}rem)` }}
        >
          {loading ? (
            <StoreCarouselItemLoading amount={4} />
          ) : data.length ? (
            data.map((item) => (
              <StoreCarouselItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            // need styling
            <p>no items</p>
          )}
        </div>
      </div>

      <button
        className={styles.CaruselButton}
        style={{ right: "-5rem" }}
        onClick={moveRight}
      >
        {">"}
      </button>
    </div>
  );
}

function StoreCarouselItem(props: StoreCarouselItem) {
  const { id, name, price, image } = props;
  const router = useRouter();

  return (
    <div
      className={styles.StoreCarouselItemContainer}
      onClick={() => {
        router.push(`/product/${id}`);
      }}
    >
      {image !== "image" ? (
        <Image
          src={image}
          alt={""}
          width={261}
          height={248}
          className={styles.CaruselItemImage}
        />
      ) : (
        <span className={styles.CaruselItemImage}>loading...</span>
      )}
      <span className={styles.CaruselItemInfo}>
        <p>{name}</p>
        <p>${price}</p>
      </span>
    </div>
  );
}

function StoreCarouselItemLoading(props: { amount: number }) {
  const { amount } = props;
  let amountArr = [];
  for (let i = 0; i < amount; i++) {
    amountArr.push(i);
  }

  return (
    <>
      {amountArr.map((index) => (
        <div className={styles.StoreCarouselItemContainer} key={index}>
          <span className={styles.CaruselItemImage}>loading...</span>
        </div>
      ))}
    </>
  );
}
