"use client";
import styles from "../../styling/Admin.module.css";
import { useState, useEffect } from "react";
import { InputValidation } from "../ContactPage/ContactForm";
import AdminImage from "./AdminImage";

/* ------------------------------
create form
------------------------------ */
export function CreateForm({
  sendImage,
  readName,
  readPrice,
  readCategory,
  readDescription,
  readPoints,
  readSelection,
  readImage,
}: {
  sendImage: (params: string[]) => void;
  readName: (params: string) => void;
  readPrice: (params: number) => void;
  readCategory: (params: string) => void;
  readDescription: (params: string) => void;
  readPoints: (params: string[]) => void;
  readSelection: (params: any) => void;
  readImage: (params: any) => void;
}) {
  useEffect(() => {
    readCategory("Computer Mouse");
  }, []);
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
  //   const [category, setCategory] = useState("");
  const [description, setDescrption] = useState("");
  const [technical, setTechnical] = useState<string[]>([]);
  //   const [image, setImage] = useState([]);
  const [selection, setSelection] = useState<
    { selection: string; options: string[]; skuValue?: string }[]
  >([
    { selection: "selection 1", options: ["option 1"] },
    { selection: "selection 1", options: ["option 1", "option 2"] },
  ]);
  const [discount, setDiscount] = useState([]);

  const [descriptionStyle, setDescriptionStyle] = useState({
    minHeight: "2rem",
  });

  /* -------------------
  technical
  -------------------*/
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
    readPoints(updatedTechArr);
  };

  const removePoint = (pointIndex: number) => {
    const proxyArr = technical;
    proxyArr.splice(pointIndex, 1);

    const updatedTechArr = proxyArr.map((point, index) => {
      return point;
    });

    setTechnical(updatedTechArr);
    readPoints(updatedTechArr);
  };

  /* -------------------
  selection
  -------------------*/
  const [addSelection, setAddSelection] = useState(false);
  const [newSelection, setNewSelection] = useState("");

  const sendSelection = (sentSelection: {
    selection: string;
    index: number;
    mutation: string;
  }) => {
    let proxySelection = selection;

    if (sentSelection.mutation === "change") {
      proxySelection[sentSelection.index].selection = sentSelection.selection;
    } else if (sentSelection.mutation === "remove") {
      proxySelection.splice(sentSelection.index, 1);
    }

    const updatedArr = proxySelection.map((value) => {
      return value;
    });

    setSelection(updatedArr);
    readSelection(updatedArr);
  };

  const mutateOption = (sentOption: {
    option: string;
    optionIndex?: number;
    index: number;
    mutation: string;
  }) => {
    let proxySelection = selection;

    if (sentOption.mutation === "add") {
      proxySelection[sentOption.index].options.push(sentOption.option);
    } else if (sentOption.mutation === "change") {
      proxySelection[sentOption.index].options[sentOption.optionIndex!] =
        sentOption.option;
    } else if (sentOption.mutation === "remove") {
      proxySelection[sentOption.index].options.splice(
        sentOption.optionIndex!,
        1
      );
    }
    const updatedArr = proxySelection.map((value) => {
      return value;
    });

    setSelection(updatedArr);
    readSelection(updatedArr);
  };

  return (
    <div className={styles.CreateFormContainer}>
      {/* -----------------------------
            Overview
        ----------------------------- */}
      <div className={styles.overview}>
        <InputValidation
          valueName="Name"
          triggerError={error.name}
          errorMessage="must include product name"
          sendValue={(value) => {
            // setName(value);
            readName(value);
          }}
        />

        <InputValidation
          valueName="Price (USD)"
          triggerError={error.name}
          errorMessage="include price"
          sendValue={(value) => {
            // setPrice(value);
            readPrice(parseFloat(value));
          }}
          width={{ width: "6rem" }}
          isNumber={true}
        />
      </div>

      <select
        className={styles.category}
        name={"category"}
        onChange={(e) => {
          readCategory(e.target.value);
        }}
      >
        <option>Computer Mouse</option>
        <option>Mechanical Keyboard</option>
      </select>

      {/* -----------------------------
            Info
        ----------------------------- */}

      <div className={styles.info}>
        <textarea
          className={styles.description}
          style={descriptionStyle}
          placeholder="enter description"
          value={description}
          onChange={(e) => {
            setDescrption(e.target.value);
            readDescription(e.target.value);
          }}
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
                  const proxyArr = [...technical, newTechnical];
                  setTechnical(proxyArr);
                  readPoints(proxyArr);
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

      {/* -----------------------------
            image
        ----------------------------- */}

      <AdminImage
        sendImage={sendImage}
        readImage={(images: any) => {
          readImage(images);
        }}
      />

      {/* -----------------------------
            selection
        ----------------------------- */}
      {/* display selection (able to edit selection and add options) */}
      <div className={styles.selection}>
        {selection.map((option, index) => (
          <SelectionDisplay
            key={index}
            selection={option.selection}
            options={option.options}
            index={index}
            sendSelection={sendSelection}
            addNewOption={mutateOption}
          />
        ))}

        {/* add selection button */}
        <span className={styles.addSelectionContainer}>
          {addSelection && (
            <input
              autoFocus
              placeholder="add new selection"
              id={styles.technicalNewInput}
              className={styles.technicalAdd}
              value={newSelection}
              onChange={(e) => {
                setNewSelection(e.target.value);
              }}
              onBlur={() => {
                // check if selection name is valid
                if (!newSelection.replace(/\s/g, "")) {
                  setAddSelection(false);
                } else {
                  // if valid, create a new instance of selection, with an empty options array
                  const proxyArr = [
                    ...selection,
                    { selection: newSelection, options: [] },
                  ];
                  setSelection(proxyArr);
                  setAddSelection(false);
                  setNewSelection("");
                }
              }}
            />
          )}

          <button
            id={styles.technicalButton}
            className={styles.technicalAdd}
            onClick={() => {
              setAddSelection(true);
            }}
          >
            add selection
          </button>
        </span>
      </div>

      {/* -----------------------------
            Overview
        ----------------------------- */}
      <div className={styles.discount}></div>
    </div>
  );
}

// ---------- technical point ------------
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

// ---------- selection display -------------

function SelectionDisplay({
  selection,
  options,
  index,
  sendSelection,
  addNewOption,
}: {
  selection: string;
  options: string[];
  index: number;
  sendSelection: (param: {
    selection: string;
    index: number;
    mutation: string;
  }) => void;
  addNewOption: (param: {
    option: string;
    index: number;
    mutation: string;
  }) => void;
}) {
  const [changeSelection, setChangeSelection] = useState(false);
  const [newSelection, setNewSelection] = useState(selection);
  const selectionIndex = index;
  const [addOption, setAddOption] = useState(false);
  const [newOption, setNewOption] = useState("");
  const mutateOption = (optionData: {
    option: string;
    optionIndex: number;
    index: number;
    mutation: string;
  }) => {
    addNewOption(optionData);
  };
  return (
    <span className={styles.selectionItemContainer}>
      <span className={styles.selectioMainContainer}>
        <div
          className={styles.pointRemove}
          onClick={() => {
            sendSelection({
              selection: newSelection,
              index: index,
              mutation: "remove",
            });
          }}
        ></div>
        {!changeSelection ? (
          <button
            className={styles.selectionSelection}
            id={styles.technicalButton}
            onClick={() => {
              setChangeSelection(true);
            }}
          >
            {selection}
          </button>
        ) : (
          <input
            autoFocus
            placeholder="changing point"
            id={styles.technicalNewInput}
            className={styles.technicalAdd}
            value={newSelection}
            onChange={(e) => {
              setNewSelection(e.target.value);
            }}
            onBlur={() => {
              if (!newSelection.replace(/\s/g, "")) {
                setChangeSelection(false);
                setNewSelection(selection);
              } else {
                sendSelection({
                  selection: newSelection,
                  index: index,
                  mutation: "change",
                });
                setChangeSelection(false);
              }
            }}
          />
        )}
      </span>

      <span className={styles.selectionOptionContainer}>
        {options.map((option, index) => (
          <OptionDisplay
            selection={newSelection}
            option={option}
            index={index}
            key={index}
            selectionIndex={selectionIndex}
            sendChangeOption={mutateOption}
          />
        ))}

        {!addOption ? (
          <button
            id={styles.optionButton}
            className={styles.selectionContainer}
            onClick={() => {
              setAddOption(true);
            }}
          >
            add option
          </button>
        ) : (
          <input
            autoFocus
            placeholder="add new option"
            id={styles.optionInput}
            className={styles.selectionContainer}
            value={newOption}
            onChange={(e) => {
              setNewOption(e.target.value);
            }}
            onBlur={() => {
              if (!newOption.replace(/\s/g, "")) {
                setAddOption(false);
              } else {
                addNewOption({
                  option: newOption,
                  index: index,
                  mutation: "add",
                });
                setAddOption(false);
                setNewOption("");
              }
            }}
          />
        )}
      </span>
    </span>
  );
}

function OptionDisplay({
  option,
  selection,
  index,
  selectionIndex,
  sendChangeOption,
}: {
  option: string;
  selection: string;
  index: number;
  selectionIndex: number;
  sendChangeOption: (param: {
    option: string;
    optionIndex: number;
    index: number;
    mutation: string;
  }) => void;
}) {
  const [changeOption, setChangeOption] = useState(false);
  const [newOption, setNewOption] = useState(option);

  return (
    <span className={styles.selectioMainContainer}>
      <div
        className={styles.pointRemove}
        onClick={() => {
          sendChangeOption({
            option: newOption,
            optionIndex: index,
            index: selectionIndex,
            mutation: "remove",
          });
        }}
      ></div>
      {changeOption ? (
        <input
          autoFocus
          placeholder="changing option..."
          id={styles.optionInput}
          className={styles.selectionContainer}
          value={newOption}
          onChange={(e) => {
            setNewOption(e.target.value);
          }}
          onBlur={() => {
            if (!newOption.replace(/\s/g, "")) {
              setChangeOption(false);
              setNewOption(option);
            } else {
              //   addNewOption({ option: newOption, index: index });
              sendChangeOption({
                option: newOption,
                optionIndex: index,
                index: selectionIndex,
                mutation: "change",
              });
              setChangeOption(false);
            }
          }}
        />
      ) : (
        <button
          className={styles.selectionContainer}
          id={styles.optionButton}
          onClick={() => {
            setChangeOption(true);
          }}
        >
          {selection} : {option}
        </button>
      )}
    </span>
  );
}
