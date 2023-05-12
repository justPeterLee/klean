"use client";
import styles from "./Menu.module.css";
interface MenuProps {
  options: string[];
  readOption: (param: string) => void;

  containerStyle?: {
    height?: string;
    width?: string;
    top?: string;
    left?: string;
    borderRadius?: string;
  };

  optionStyle?: {
    height?: string;
    width?: string;
    backgroundColor?: string;
    fontSize?: string;
    color?: string;
  };
}
export default function Menu(props: MenuProps) {
  const { options, readOption, containerStyle, optionStyle } = props;
  const sendOption = (selectedOption: string) => {
    readOption(selectedOption);
  };
  return (
    <div
      className={styles.container}
      style={containerStyle ? containerStyle : {}}
    >
      {options &&
        options.map((option, index) => (
          <button
            className={styles.menuButton}
            style={optionStyle ? optionStyle : {}}
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
