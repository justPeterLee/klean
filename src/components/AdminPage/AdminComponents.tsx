"use client";
import styles from "../../styling/Admin.module.css";
import { useState, useEffect, useRef } from "react";
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

  const descriptionRef = useRef<HTMLInputElement | null>(null);

  const [description, setDescrption] = useState("");

  const [technical, setTechnical] = useState<string[]>([]);

  const [selection, setSelection] = useState<
    {
      selection: string;
      options: { option: string; skuValue: string }[];
      skuValue?: string;
    }[]
  >([]);

  const [descriptionStyle, setDescriptionStyle] = useState({
    minHeight: "2rem",
  });
  const [descriptionLimit, setDescriptionLimit] = useState({});

  // ----- fetch categories -----
  const [dbCategories, setDbCategories] = useState<any>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/admin/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const categories = await response.json();
      setDbCategories(categories);
      readCategory(categories[0].id);
    };

    fetchCategories();
  }, []);

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

    const templateSKU = (str: string) => {
      let string = str
        .replace(/\s/g, "")
        .replace(/[aeiou]/gi, "")
        .toUpperCase()
        .substring(0, 4);

      return string;
    };

    const optionValue = {
      option: sentOption.option,
      skuValue: templateSKU(sentOption.option),
    };
    if (sentOption.mutation === "add") {
      proxySelection[sentOption.index].options.push(optionValue);
    } else if (sentOption.mutation === "change") {
      proxySelection[sentOption.index].options[sentOption.optionIndex!] =
        optionValue;
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

  // category creatation
  const [categoryCreate, setCategoryCreate] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [catLabel, setCatLabel] = useState(false);
  const createCat = useRef<HTMLInputElement>(null);
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
          characterLimit={40}
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

      {/* categories */}
      <div className={styles.categoryContainer}>
        {!categoryCreate ? (
          <>
            <button
              className={styles.categoryButton}
              onClick={async () => {
                await setCategoryCreate(true);
                createCat.current?.focus();
              }}
            >
              +
            </button>
            <select
              className={styles.category}
              name={"category"}
              onChange={(e) => {
                console.log(e.target.value);
                readCategory(e.target.value);
              }}
            >
              {dbCategories.length ? (
                dbCategories.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.category_description}
                  </option>
                ))
              ) : (
                <option>loading...</option>
              )}
            </select>
          </>
        ) : (
          <>
            <button
              className={styles.categoryButton}
              onClick={() => {
                setCategoryCreate(false);
              }}
            >
              x
            </button>

            <div className={styles.categoryContainerContainer}>
              <label style={!catLabel ? { color: "blue" } : { color: "black" }}>
                Create Category
              </label>
              <input
                className={styles.createCategoryInput}
                id="createCategory"
                ref={createCat}
                onBlur={() => {
                  setCatLabel(true);
                }}
                onFocus={() => {
                  setCatLabel(false);
                }}
              />
            </div>
          </>
        )}
      </div>

      {/* -----------------------------
            Info
        ----------------------------- */}

      <div className={styles.info}>
        <span className={styles.descriptionContainer}>
          <label htmlFor="description-input" style={descriptionLimit}>
            {description.length}/255
          </label>
          <textarea
            className={styles.description}
            id="description-input"
            style={{ ...descriptionStyle }}
            placeholder="enter description"
            value={description}
            onChange={(e) => {
              if (e.target.value.length <= 255) {
                setDescrption(e.target.value);
                readDescription(e.target.value);
              }
            }}
            onFocus={() => {
              setDescriptionStyle({ minHeight: "5rem" });
              setDescriptionLimit({ color: "rgb(0,0,0,.5)" });
            }}
            onBlur={() => {
              if (descriptionRef.current?.offsetHeight) {
                if (descriptionRef.current?.offsetHeight >= 32) {
                  setDescriptionStyle({
                    minHeight: `${descriptionRef.current?.offsetHeight + 10}px`,
                  });
                }
              } else {
                setDescriptionStyle({ minHeight: "2rem" });
              }
              setDescriptionLimit({ color: "rgb(0,0,0,0)" });
            }}
          />
          <div
            style={{
              width: "24rem",
              wordWrap: "break-word",
              visibility: "hidden",
              position: "absolute",
            }}
          >
            <p ref={descriptionRef}>{description}</p>
          </div>
        </span>

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
              if (technical.length < 3) {
                setAddTechnical(true);
              }
            }}
            disabled={technical.length >= 3}
          >
            add point
            <p className={styles.limitTitle}>{technical.length}/3</p>
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
            disabled={selection.length >= 3}
          >
            add selection
            <p className={styles.limitTitle}>{selection.length}/3</p>
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
  options: { option: string; skuValue: string }[];
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
            option={option.option}
            optionSKU={option.skuValue}
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
            disabled={options.length >= 3}
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
  optionSKU,
  selection,
  index,
  selectionIndex,
  sendChangeOption,
}: {
  option: string;
  optionSKU: string;
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
          {selection} : {option} : {optionSKU}
        </button>
      )}
    </span>
  );
}

interface LongInputProps {
  readDescription: (params: string) => void;
  error: boolean;
}
export function LongInput(props: LongInputProps) {
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const [descriptionLimit, setDescriptionLimit] = useState({});
  const [descriptionStyle, setDescriptionStyle] = useState({
    minHeight: "2rem",
  });
  const [description, setDescrption] = useState("");

  return (
    <span className={styles.descriptionContainer}>
      <label htmlFor="description-input" style={descriptionLimit}>
        {description.length}/255
      </label>
      <textarea
        className={`${styles.description} ${
          !props.error && styles.descriptionError
        }`}
        id="description-input"
        style={{ ...descriptionStyle }}
        placeholder="enter description"
        value={description}
        onChange={(e) => {
          if (e.target.value.length <= 255) {
            setDescrption(e.target.value);
            // readDescription(e.target.value);
            props.readDescription(e.target.value);
          }
        }}
        onFocus={() => {
          setDescriptionStyle({ minHeight: "10rem" });
          setDescriptionLimit({ color: "rgb(0,0,0,.5)" });
        }}
        onBlur={() => {
          if (descriptionRef.current?.offsetHeight) {
            if (descriptionRef.current?.offsetHeight >= 32) {
              setDescriptionStyle({
                minHeight: `${descriptionRef.current?.offsetHeight + 15}px`,
              });
            } else {
              setDescriptionStyle({ minHeight: "2rem" });
            }
          } else {
            setDescriptionStyle({ minHeight: "2rem" });
          }
          setDescriptionLimit({ color: "rgb(0,0,0,0)" });
        }}
      />
      <div
        style={{
          width: "22rem",
          wordWrap: "break-word",
          visibility: "hidden",
          position: "absolute",
          fontSize: "15px",
          // display: "none",
        }}
      >
        <p ref={descriptionRef} style={{ fontSize: "15px" }}>
          {description}
        </p>

        {JSON.stringify(descriptionRef.current?.offsetHeight)}
      </div>
    </span>
  );
}
