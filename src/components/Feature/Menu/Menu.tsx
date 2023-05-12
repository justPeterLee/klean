"use client";
import styles from "./Menu.module.css";
interface MenuProps {
  options: string[];
  readOption: (param: string) => void;
}
export default function Menu(props: MenuProps) {
  const { options, readOption } = props;
  const sendOption = (selectedOption: string) => {
    readOption(selectedOption);
  };
  return (
    <div className={styles.container}>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => {
            sendOption(option);
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
