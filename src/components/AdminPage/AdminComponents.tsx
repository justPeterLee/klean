"use client";
import styles from "../../styling/Admin.module.css";
import { useState, useEffect } from "react";
import { InputValidation } from "../ContactPage/ContactForm";

/* ------------------------------
create form
------------------------------ */
export function CreateForm() {
  const [error, setError] = useState({
    name: true,
    price: true,
    category: true,
    description: true,
    technical: true,
    image: true,
    selection: true,
    discount: true,
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescrption] = useState("");
  const [technical, setTechnical] = useState([]);
  const [image, setImage] = useState([]);
  const [selection, setSelection] = useState([]);
  const [discount, setDiscount] = useState([]);

  const [descriptionStyle, setDescriptionStyle] = useState({
    minHeight: "2rem",
  });
  return (
    <div className={styles.CreateFormContainer}>
      <div className={styles.overview}>
        <InputValidation
          valueName="Name"
          triggerError={error.name}
          errorMessage="must include product name"
          sendValue={(value) => {
            setName(value);
          }}
        />

        <InputValidation
          valueName="Price (USD)"
          triggerError={error.name}
          errorMessage="include price"
          sendValue={(value) => {
            setPrice(value);
          }}
          width={{ width: "6rem" }}
          isNumber={true}
        />
      </div>

      <select className={styles.category} name={"category"}>
        <option>Computer Mouse</option>
        <option>Mechanical Keyboard</option>
      </select>

      <div className={styles.info}>
        <textarea
          className={styles.description}
          style={descriptionStyle}
          onFocus={() => {
            setDescriptionStyle({ minHeight: "5rem" });
          }}
          onBlur={() => {
            setDescriptionStyle({ minHeight: "2rem" });
          }}
        />

        <div className={styles.technicalContainer}>
          {technical.map((point, index) => (
            <button>{point}</button>
          ))}

          <button>add point</button>
        </div>
      </div>
      <div className={styles.image}></div>
      <div className={styles.selection}></div>
      <div className={styles.discount}></div>
    </div>
  );
}
