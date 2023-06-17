"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
export const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

interface FavoriteContextType {
  favorite: any[];
  skuIDs: number[];
  favoriteFunc?: {
    getFavorite: () => void;
    postFavorite: (data: {
      id: number;
      productId: string;
      skuId: string;
    }) => void;
    removeFavorite: (data: {
      skuId: string;
      userId: number;
      productId: string;
    }) => void;
  };
}

export default function FavoriteContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
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
  interface PostFavorite {
    id: number;
    productId: string;
    skuId: string;
  }
  async function postFavorite(data: PostFavorite) {
    const session = await getCurSession();
    setCurSession(session);
    if (session) {
      try {
        if (session) {
          const res = await fetch("/api/postFavorite", {
            method: "POST",
            body: JSON.stringify({
              userId: session?.user.id,
              productId: data.productId,
              skuId: data.skuId,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          fetchFavorite();
        } else {
          console.log("must be logged in");
        }
      } catch (err) {
        console.log("Error with favoriting item, ", err);
      }
    }
  }
  // remove from favorites
  interface RemoveInterface {
    skuId: string;
    userId: number;
    productId: string;
  }
  async function removeFavorite(data: RemoveInterface) {
    const session = await getCurSession();
    setCurSession(session);
    if (session) {
      try {
        if (session) {
          const res = await fetch("/api/removeFavorite", {
            method: "POST",
            body: JSON.stringify({
              userId: session?.user.id,
              productId: data.productId,
              skuId: data.skuId,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          fetchFavorite();
        } else {
          console.log("must be logged in");
        }
      } catch (err) {
        console.log("Error with removing favorite item: ", err);
      }
    }
  }

  async function getCurSession() {
    const session = await getSession();
    console.log(session);
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
          postFavorite: postFavorite,
          removeFavorite: removeFavorite,
        },
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
