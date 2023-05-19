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
  const [technical, setTechnical] = useState<string[]>([]);
  const [testPoint, setTestPoint] = useState("");
  const [image, setImage] = useState([]);
  const [selection, setSelection] = useState([]);
  const [discount, setDiscount] = useState([]);

  const [descriptionStyle, setDescriptionStyle] = useState({
    minHeight: "2rem",
  });

  const [addTechnical, setAddTechnical] = useState(false);
  const [newTechnical, setNewTechnial] = useState("");

  const readPoint = (newPoint: { point: string; index: number }) => {
    const updatedTechArr = technical.map((point, index) => {
      if (index === newPoint.index) {
        return newPoint.point;
      }
      return point;
    });

    setTechnical(updatedTechArr);
  };

  const removePoint = (pointIndex: number) => {
    const proxyArr = technical;
    proxyArr.splice(pointIndex, 1);

    const updatedTechArr = proxyArr.map((point, index) => {
      return point;
    });

    setTechnical(updatedTechArr);
  };

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
            <TechnicalPoint
              point={point}
              index={index}
              sendPoint={readPoint}
              removePoint={removePoint}
              key={index}
            />
          ))}
          {addTechnical && (
            <input
              autoFocus
              placeholder="add new point"
              id={styles.technicalNewInput}
              className={styles.technicalAdd}
              value={newTechnical}
              onChange={(e) => {
                setNewTechnial(e.target.value);
              }}
              onBlur={() => {
                if (!newTechnical.replace(/\s/g, "")) {
                  setAddTechnical(false);
                } else {
                  setTechnical([...technical, newTechnical]);
                  setAddTechnical(false);
                  setNewTechnial("");
                }
              }}
            />
          )}

          <button
            id={styles.technicalButton}
            className={styles.technicalAdd}
            onClick={() => {
              setAddTechnical(true);
            }}
          >
            add point
          </button>
        </div>
      </div>
      <div className={styles.image}></div>
      <div className={styles.selection}></div>
      <div className={styles.discount}></div>
    </div>
  );
}

function TechnicalPoint({
  point,
  index,
  sendPoint,
  removePoint,
}: {
  point: string;
  index: number;
  sendPoint: (param: { point: string; index: number }) => void;
  removePoint: (param: number) => void;
}) {
  const [changePoint, setChangePoint] = useState(false);
  const [newPoint, setNewPoint] = useState(point);
  return (
    <div className={styles.pointContainer}>
      {!changePoint ? (
        <button
          id={styles.technicalButton}
          className={styles.technicalAdd}
          onClick={() => {
            setChangePoint(true);
          }}
        >
          {point}
        </button>
      ) : (
        <input
          autoFocus
          placeholder="changing point"
          id={styles.technicalNewInput}
          className={styles.technicalAdd}
          value={newPoint}
          onChange={(e) => {
            setNewPoint(e.target.value);
          }}
          onBlur={() => {
            if (!newPoint.replace(/\s/g, "")) {
              setChangePoint(false);
              setNewPoint(point);
            } else {
              sendPoint({ point: newPoint, index: index });
              setChangePoint(false);
              // setNewPoint(newPoint);
            }
          }}
        />
      )}

      <div
        className={styles.pointRemove}
        onClick={() => {
          removePoint(index);
        }}
      ></div>
    </div>
  );
}
