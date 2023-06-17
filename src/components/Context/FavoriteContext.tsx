"use client";
import { createContext, useState, useEffect } from "react";
import { getSession } from "next-auth/react";
export const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);
interface favorite {
  id: number;
  productId: number;
  skuId: number;
  productData: {
    name: string;
    price: number;
    category: string;
    thumbnail: string;
  };
  toBeDeleted: boolean;
}

interface AddProxyFavParams {
  id: number;
  productId: number;
  skuId: number;
  productData: {
    name: string;
    price: number;
    category: string;
    thumbnail: string;
  };
}

interface ChangeFavoriteDBParams {
  skuId: number;
  productId: number;
}

interface FavoriteContextType {
  favorite: favorite[];
  skuIDs: number[];
  favoriteFunc?: {
    getFavorite: () => void;
    proxyRemove: (skuId: number, productId: number, add: boolean) => void;
    isFavorited: (skuId: number) => void;
    getIndex: (skuId: number, productId: number) => any;
    postFavorite: (
      data: { skuId: number; productId: number },
      refesh: boolean
    ) => void;
    addProxyFav: (params: AddProxyFavParams) => void;
  };
}

export default function FavoriteContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [CurSession, setCurSession] = useState<any>(null);
  const [favorite, setFavorite] = useState([]);
  const [error, setError] = useState(false);
  // get favorites
  async function fetchFavorite() {
    const session = await getCurSession();
    setCurSession(session);
    if (session) {
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
        setFavorite(favoriteItems);
        setError(false);
      } catch (err) {
        console.log("Error with fetching favorites: ", err);
        setError(true);
      }
    } else {
      console.log("need to logged in to add to favorites");
    }
  }
  // add to favorites
  async function postFavorite(data: ChangeFavoriteDBParams, refesh: boolean) {
    const session = await getCurSession();
    setCurSession(session);
    if (session) {
      try {
        if (session) {
          const res = await fetch("/api/postFavorite", {
            method: "POST",
            body: JSON.stringify({
              userId: parseInt(session?.user.id),
              productId: data.productId,
              skuId: data.skuId,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (refesh) {
            fetchFavorite();
          }
        } else {
          console.log("must be logged in");
        }
      } catch (err) {
        console.log("Error with favoriting item, ", err);
      }
    }
  }
  // remove from favorites

  async function removeFavorite(data: ChangeFavoriteDBParams) {
    const session = await getCurSession();
    setCurSession(session);

    if (session) {
      try {
        if (session) {
          const res = await fetch("/api/removeFavorite", {
            method: "POST",
            body: JSON.stringify({
              userId: parseInt(session?.user.id),
              productId: data.productId,
              skuId: data.skuId,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          //   fetchFavorite();
        } else {
          console.log("must be logged in");
        }
      } catch (err) {
        console.log("Error with removing favorite item: ", err);
      }
    }
  }

  function proxyRemove(skuId: number, productId: number, add: boolean) {
    const proxyRemoveArr: any = favorite.map((item: any) => {
      if (item.skuId === skuId) {
        if (add) {
          return { ...item, toBeDeleted: false };
        } else {
          return { ...item, toBeDeleted: true };
        }
      }
      return item;
    });
    setFavorite(proxyRemoveArr);

    if (!add) {
      removeFavorite({ skuId: skuId, productId: productId });
    } else {
      postFavorite({ skuId: skuId, productId: productId }, false);
    }
  }

  // is favorited (should return true or false if item is in array && item is false (toBeDeleted))
  function isFavorited(skuId: number) {
    const proxyArr = favorite.map((item) => item);

    const proxyEvalutatedArr = proxyArr
      .map((item: any) => {
        if (skuId === item.skuId) {
          return item;
        }
      })
      .filter((item: any) => {
        if (item) {
          return item;
        }
      });

    if (proxyEvalutatedArr.length) {
      return true;
    } else {
      return false;
    }
  }

  function getIndex(skuId: number, productId: number) {
    const proxyArr = favorite.map((item) => item);
    let proxyIndex;
    proxyArr.map((item: any, index: number) => {
      if (skuId === item.skuId && productId === item.productId) {
        proxyIndex = index;
      }
    });

    if (typeof proxyIndex === "number") {
      return proxyIndex;
    } else {
      return 10;
    }
  }

  function addProxyFav(data: AddProxyFavParams) {
    let proxyArr: any = favorite.map((item) => item);
    let proxyData: any = data;
    proxyData.toBeDeleted = false;
    proxyArr.push(proxyData);

    let copyProxy = proxyArr.map((item: any) => item);

    setFavorite(copyProxy);

    postFavorite({ skuId: data.skuId, productId: data.productId }, true);
  }

  async function getCurSession() {
    const session = await getSession();
    setCurSession(session);
    return session;
  }

  useEffect(() => {
    fetchFavorite();
  }, []);
  return (
    <FavoriteContext.Provider
      value={{
        favorite: favorite,
        skuIDs: favorite.map((item: any) => {
          return item.skuId;
        }),
        favoriteFunc: {
          getFavorite: fetchFavorite,
          proxyRemove: proxyRemove,
          isFavorited: isFavorited,
          getIndex: getIndex,
          postFavorite: postFavorite,
          addProxyFav: addProxyFav,
        },
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
