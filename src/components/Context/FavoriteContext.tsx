"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
export const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

interface FavoriteContextType {
  favorite: {} | null;
  favoriteFunc?: {};
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

  // remove from favorites

  useEffect(() => {
    if (session && status === "authenticated") {
      fetchFavorite();
    } else {
      setFavorite(null);
    }
  }, []);
  return (
    <FavoriteContext.Provider value={{ favorite: favorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}
