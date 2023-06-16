"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
export const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

interface FavoriteContextType {
  favorite: {} | null;
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
  const [favorite, setFavorite] = useState(null);
  const [error, setError] = useState(false);
  // get favorites
  async function fetchFavorite() {
    if (session && status === "authenticated") {
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
    if (session && status === "authenticated") {
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
    if (session && status === "authenticated") {
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
  useEffect(() => {
    if (session && status === "authenticated") {
      fetchFavorite();
    } else {
      setFavorite(null);
    }
  }, []);
  return (
    <FavoriteContext.Provider
      value={{
        favorite: favorite,
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
