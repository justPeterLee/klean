"use client";

import { useSession } from "next-auth/react";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { data, status } = useSession();

  console.log(data, status);

  if (status === "authenticated") {
    return <>{data.user.name}</>;
  } else {
    return <>not</>;
  }
}
