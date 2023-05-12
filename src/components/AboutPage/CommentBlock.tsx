"use client";
import styles from "../../styling/About.module.css";
interface CommentBlockProps {
  title?: string;
  comment: string;
}
export default function CommentBlock(props: CommentBlockProps) {
  const { title, comment } = props;
  return (
    <div className={styles.commentBlockContainer}>
      {title && <p className={styles.commentTitle}>{title}</p>}
      <p className={styles.commentDescription}>{comment}</p>
    </div>
  );
}
