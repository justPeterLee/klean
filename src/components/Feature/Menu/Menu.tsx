"use client";
import { useState } from "react";
import styles from "./Menu.module.css";

/* ------------------------------------------------------
  Menu
  - the menu is a client component, that allows users to 
  what to display. The user will be provided with different
  options (depending on what you provide), and the user 
  will select from the few. This is NOT a link to a new page 
  but rather just rendering differenct content on the same 
  page.

  props:
  - options (required)
    - an array of strings 
    - each must be different as they will also be the key
    to signify what to render
  
  - readOption function (required)
    - since Menu is a child componet, your parent component 
    will need to know what the user has selected
    - chain prop function
  
  - selected (required)
    - provide the selected value from the readOption
    - will display the selected option (onHover)
  
  - styling (optional)
    - able to add custom styling to the menu
    - an object used to add inline styling
    - height, width, top, left borderRadius
  
  
  (readOption)
  const [optionSelected, setOptionSelected] = useState("color 1");

  const readOption = (option: string) => {
    setOptionSelected(option);
  };
------------------------------------------------------ */
interface MenuProps {
  options: string[];
  readOption: (param: string) => void;

  containerStyle?: {
    height?: string;
    width?: string;
    top?: string;
    left?: string;
    borderRadius?: string;
    backgroundColor?: string;
  };

  optionStyle?: {
    height?: string;
    width?: string;
    backgroundColor?: string;
    fontSize?: string;
    color?: string;
  };
  hover?: string;
  selected: string;
}
export default function Menu(props: MenuProps) {
  const { options, readOption, containerStyle, optionStyle, selected, hover } =
    props;
  const sendOption = (selectedOption: string) => {
    readOption(selectedOption);
  };

  const [selectedStyle, setSelectedStyle] = useState({
    backgroundColor: "transparent",
  });

  const [hoverColor, setHoverColor] = useState(hover);
  const [containerStyleState, setContainerStyle] = useState(containerStyle);

  const showSelected = () => {
    setSelectedStyle({ backgroundColor: "rgb(00, 00, 00, 0.5)" });
    if (hover && containerStyle?.backgroundColor) {
      setHoverColor(containerStyle?.backgroundColor);
      setContainerStyle({
        ...containerStyleState,
        backgroundColor: hoverColor,
      });
    }
  };
  const hideSelected = () => {
    setSelectedStyle({ backgroundColor: "transparent" });
    if (hover && containerStyle?.backgroundColor) {
      setHoverColor(hover);
      setContainerStyle({
        ...containerStyleState,
        backgroundColor: hoverColor,
      });
    }
  };
  return (
    <div
      className={styles.container}
      style={containerStyle ? containerStyleState : {}}
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
