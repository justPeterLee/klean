"use client";
import styles from "../../styling/About.module.css";
import { useState } from "react";
import Menu from "@/components/GlobalComponent/Menu/Menu";
import { trace } from "console";

interface CommentBlockProps {
  title?: string;
  comment: string;
}
interface TeamHeadShot {
  image: string;
  name: string;
  role: string;
  link: string;
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

export function TeamHeadShot(props: TeamHeadShot) {
  const { image, name, role, link } = props;
  return (
    <div className={styles.headShotContainer}>
      <img
        className={styles.teamImage}
        src={image}
        alt={name}
        onClick={() => {
          window.open(link, "_blank");
        }}
      />
      <div className={styles.teamInfo}>
        <p
          className={styles.teamName}
          onClick={() => {
            window.open(link, "_blank");
          }}
        >
          {name}
        </p>
        <p className={styles.teamRole}>{role}</p>
      </div>
    </div>
  );
}

interface AboutPageProps {
  comments: { title: string; comment: string }[];
  team: {
    link: string;
    image: string;
    name: string;
    role: string;
  }[];
}
export function AboutPage(props: AboutPageProps) {
  const { comments, team } = props;
  const [optionSelected, setOptionSelected] = useState("About Us");

  const readOption = (option: string) => {
    setOptionSelected(option);
  };
  return (
    <main className={` ${styles.container}`}>
      {/* Menu */}
      <div className={styles.menuContainer}>
        <Menu
          options={["About Us", "Our Team"]}
          readOption={readOption}
          selected={optionSelected}
          containerStyle={{
            top: "0",
            left: "0",
            backgroundColor: "rgb(0, 0, 0, 0.03)",
          }}
          hover={"rgb(0, 0, 0, 0.1)"}
        />
      </div>

      {/* About Us container */}
      {optionSelected === "About Us" && (
        <div className={styles.aboutContainer}>
          {comments &&
            comments.map((comment, index) => (
              <CommentBlock key={index} comment={comment.comment} />
            ))}
        </div>
      )}

      {/* Our Team container */}
      {optionSelected === "Our Team" && (
        <div className={styles.teamContainer}>
          {team &&
            team.map((person, index) => (
              <TeamHeadShot
                key={index}
                image={person.image}
                name={person.name}
                role={person.role}
                link={person.link}
              />
            ))}
        </div>
      )}
    </main>
  );
}
