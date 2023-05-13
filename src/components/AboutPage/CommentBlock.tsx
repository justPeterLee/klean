"use client";
import styles from "../../styling/About.module.css";
interface CommentBlockProps {
  title?: string;
  comment: string;
}
export function CommentBlock(props: CommentBlockProps) {
  const { title, comment } = props;
  return (
    <div className={styles.commentBlockContainer}>
      {title && <p className={styles.commentTitle}>{title}</p>}
      <p className={styles.commentDescription}>{comment}</p>
    </div>
  );
}

interface TeamHeadShot {
  image?: string;
  name: string;
  role: string;
}
export function TeamHeadShot(props: TeamHeadShot) {
  const { image, name, role } = props;
  return (
    <div className={styles.headShotContainer}>
      <div className={styles.teamImage}></div>
      <div className={styles.teamInfo}>
        <p className={styles.teamName}>{name}</p>
        <p className={styles.teamRole}>{role}</p>
      </div>
    </div>
  );
}
