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
          valueName="price"
          triggerError={error.name}
          errorMessage="must include product price"
          sendValue={(value) => {
            setPrice(value);
          }}
        />
      </div>

      <div className={styles.info}>
        <InputValidation
          valueName="price"
          triggerError={error.name}
          errorMessage="must include product price"
          sendValue={(value) => {
            setPrice(value);
          }}
        />
      </div>
      <div className={styles.image}></div>
      <div className={styles.selection}></div>
      <div className={styles.discount}></div>
    </div>
  );
}
