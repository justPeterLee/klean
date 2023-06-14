"use client";
import Register from "@/components/User/Register/Register";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function user() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to login page if user is not logged in
      router.push("/user/login");
    }
  }, [status, router]);

  if (status === "loading") {
    // Show loading state if session is still being fetched

    return <p>Loading...</p>;
  }

  return <p>user page</p>;
}
