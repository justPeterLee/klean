"use client";
import styles from "../../styling/About.module.css";
import { useState } from "react";

// components
import Menu from "@/components/Feature/Menu/Menu";
import {
  CommentBlock,
  TeamHeadShot,
} from "@/components/AboutPage/CommentBlock";

const text1 =
  "Welcome to Klean, the premier destination for computer mice enthusiasts seeking high-quality and unique products. At Klean, we understand the importance of a reliable and comfortable mouse for your computing needs. That's why we have curated a remarkable collection of top-notch computer mice that combine exceptional performance, ergonomic design, and cutting-edge technology. Whether you're a gamer, designer, or professional, Klean is committed to delivering an unparalleled browsing and gaming experience through our carefully selected range of mice.";
const text2 =
  "At Klean, we believe that every user deserves a mouse that perfectly suits their preferences and enhances their productivity. Our extensive selection features a wide variety of styles, shapes, and sizes, ensuring that you'll find the ideal mouse for your unique needs. From sleek and minimalistic designs to vibrant and eye-catching models, our range caters to diverse tastes and aesthetics. We partner with renowned manufacturers who share our passion for quality and innovation, ensuring that each mouse you find at Klean is crafted to the highest standards.";
const text3 =
  "What sets Klean apart is our unwavering commitment to offering exceptional customer service and satisfaction. Our knowledgeable team is dedicated to guiding you through your shopping journey, providing expert advice and answering any questions you may have. We take pride in our attention to detail and personalized approach, striving to create a seamless and enjoyable shopping experience for all our valued customers. From browsing our user-friendly website to receiving your meticulously packaged order, Klean ensures that every step of your journey reflects our commitment to excellence.";
const text4 =
  "With Klean, you can shop with confidence, knowing that each mouse in our collection undergoes rigorous quality assurance checks. We prioritize functionality, durability, and performance, ensuring that our products withstand the demands of daily use. Our dedication to quality extends beyond the physical aspects of our mice, as we also prioritize software compatibility, ergonomic comfort, and customizable features to enhance your overall experience. Discover the world of exceptional computer mice at Klean and elevate your computing setup to new heights.";

const comments = [
  { title: "", comment: text1 },
  { title: "", comment: text2 },
  { title: "", comment: text3 },
  { title: "", comment: text4 },
];

const team = [
  { image: "", name: "Peter Lee", role: "CEO" },
  { image: "", name: "Name name", role: "Developer" },
  { image: "", name: "Name name", role: "Developer" },
  { image: "", name: "Name name", role: "Developer" },
];
export default function About() {
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
              />
            ))}
        </div>
      )}
    </main>
  );
}
