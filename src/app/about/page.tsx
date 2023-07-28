import styles from "../../styling/About.module.css";
import { AboutPage } from "@/components/AboutPage/CommentBlock";

const comments = [
  {
    title: "",
    comment:
      "Welcome to Klean, the premier destination for computer mice enthusiasts seeking high-quality and unique products. At Klean, we understand the importance of a reliable and comfortable mouse for your computing needs. That's why we have curated a remarkable collection of top-notch computer mice that combine exceptional performance, ergonomic design, and cutting-edge technology. Whether you're a gamer, designer, or professional, Klean is committed to delivering an unparalleled browsing and gaming experience through our carefully selected range of mice.",
  },
  {
    title: "",
    comment:
      "At Klean, we believe that every user deserves a mouse that perfectly suits their preferences and enhances their productivity. Our extensive selection features a wide variety of styles, shapes, and sizes, ensuring that you'll find the ideal mouse for your unique needs. From sleek and minimalistic designs to vibrant and eye-catching models, our range caters to diverse tastes and aesthetics. We partner with renowned manufacturers who share our passion for quality and innovation, ensuring that each mouse you find at Klean is crafted to the highest standards.",
  },
  {
    title: "",
    comment:
      "What sets Klean apart is our unwavering commitment to offering exceptional customer service and satisfaction. Our knowledgeable team is dedicated to guiding you through your shopping journey, providing expert advice and answering any questions you may have. We take pride in our attention to detail and personalized approach, striving to create a seamless and enjoyable shopping experience for all our valued customers. From browsing our user-friendly website to receiving your meticulously packaged order, Klean ensures that every step of your journey reflects our commitment to excellence.",
  },
  {
    title: "",
    comment:
      "With Klean, you can shop with confidence, knowing that each mouse in our collection undergoes rigorous quality assurance checks. We prioritize functionality, durability, and performance, ensuring that our products withstand the demands of daily use. Our dedication to quality extends beyond the physical aspects of our mice, as we also prioritize software compatibility, ergonomic comfort, and customizable features to enhance your overall experience. Discover the world of exceptional computer mice at Klean and elevate your computing setup to new heights.",
  },
];

async function fetchTeam() {
  const teamData = process.env.GITHUB_TOKEN;
  try {
    let team = await JSON.parse(teamData!);
    const userName = Object.keys(team);

    const data = await Promise.all(
      userName.map(async (user: string) => {
        const role = team[user].role;
        const accessToken = team[user].key;
        const apiUrl = `https://api.github.com/users/${user}`;
        const headers = {
          Authorization: `token ${accessToken}`,
        };
        const res = await fetch(apiUrl, { headers });

        const data = await res.json();

        return {
          name: data.name,
          image: data.avatar_url,
          role: role,
          link: data.html_url,
        };
      })
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function About() {
  const team: any = await fetchTeam();

  return (
    <main className={` ${styles.container}`}>
      <AboutPage comments={comments} team={team} />
    </main>
  );
}
