"use client";
import { useState } from "react";
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

  selected: string;
}
export default function Menu(props: MenuProps) {
  const { options, readOption, containerStyle, optionStyle, selected } = props;
  const sendOption = (selectedOption: string) => {
    readOption(selectedOption);
  };

  const [selectedStyle, setSelectedStyle] = useState({
    backgroundColor: "transparent",
  });

  const showSelected = () => {
    setSelectedStyle({ backgroundColor: "rgb(00, 00, 00, 0.5)" });
  };
  const hideSelected = () => {
    setSelectedStyle({ backgroundColor: "transparent" });
  };
  return (
    <div
      className={styles.container}
      style={containerStyle ? containerStyle : {}}
      onMouseEnter={showSelected}
      onMouseLeave={hideSelected}
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
            {selected === option && (
              <div className={styles.selected} style={selectedStyle}></div>
            )}
            {option}
          </button>
        ))}
    </div>
  );
}
