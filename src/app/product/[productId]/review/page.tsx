import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import styles from "../../../../styling/Review.module.css";
import ReviewRedirect from "@/components/ReviewPage/ReviewRedirect";

export default async function reivew({
  params,
}: {
  params: { productId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <ReviewRedirect />;
  }
  return (
    <div className={styles.main}>
      <p>add review page</p>
    </div>
  );
}
