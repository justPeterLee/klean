"use client";
import { useState } from "react";
import styles from "../../styling/Product.module.css";

interface ProductInfoProps {
  //   data?: {
  //     name: string;
  //     price: number | string;
  //     category: string;
  //     description: string;
  //     technical: string[];
  //     review: {
  //       rate: string | number;
  //       date: string | Date;
  //       message: string;
  //       user?: string;
  //     };
  //     selection: any[];
  //   };
  data: any;
}

const dummyData = {
  name: "Product One",
  price: 120,
  category: "Computer Mouse",
  description:
    "A sleek computer mouse intended to match the sensation of a mechanical keyboard. Instead of the traditional mouse click, we used keyboard switches and caps to replace the traditional mouse click instead for a more familiar and unique experience.",
  technical: ["1200/1600 dpi", "white, tan, grey", "wireless/wired", "PET"],
};
export default function ProductInfo(props: ProductInfoProps) {
  const { data } = props;

  return (
    <div className={styles.ProductInfoContainer}>
      {/* general information (name, price, category, favoirte(button)) */}
      <div className={styles.ProductGeneralContainer}>
        <span className={styles.NamePrice}>
          <p id={styles.name}>{dummyData.name}</p>
          <p id={styles.price}>${dummyData.price}</p>
        </span>

        <span className={styles.Category}>{dummyData.category}</span>

        <button className={styles.Favorite}>{"<3"}</button>
      </div>

      <LINEBREAK />
      {/* selection (selection, options) */}

      <Selection selection={data.product_selection} />

      <LINEBREAK />

      {/* description (description, technical points) */}
      <div className={styles.ProductDescriptionContainer}>
        <span className={styles.Description}>
          <p>{dummyData.description}</p>
        </span>
        <span className={styles.Technical}>
          <ul className={styles.TechnicalUl}>
            {dummyData.technical.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </span>
      </div>

      <LINEBREAK />

      {/* review */}
    </div>
  );
}

function LINEBREAK() {
  return <div className={styles.line}></div>;
}

interface SelectionProps {
  //   selection?: {}[];
  selection: any;
}
function Selection(props: SelectionProps) {
  const { selection } = props;
  const [selectionKey, setSelectionKey] = useState<any>({});
  return (
    <div className={styles.SelectionContainer}>
      {/* {JSON.stringify(selection)} */}
      {JSON.stringify(selectionKey)}
      {selection.map((select: any) => (
        <Option
          key={select.id}
          selection={select}
          selected={selectionKey[select.selection_key]}
          readOption={(option: any) => {
            setSelectionKey({ ...selectionKey, [option.key]: option.value });
          }}
        />
      ))}
    </div>
  );
}

interface OptionProp {
  selection: any;
  selected: any;
  readOption: (params: { key: string | number; value: string }) => void;
}
function Option(props: OptionProp) {
  const { selection, selected, readOption } = props;
  const [selectionKey, setSelectionKey] = useState({});

  return (
    <div>
      {selection.selection_name}
      {selected}

      {/* option */}
      <div className={styles.OptionContiner}>
        {selection.product_option.map((option: any) => (
          <button
            style={
              selected === option.option_sku
                ? { border: "solid 2px black" }
                : {}
            }
            key={option.id}
            className={styles.OptionButton}
            onClick={() => {
              setSelectionKey({
                key: selection.selection_key,
                value: option.option_sku,
              });
              readOption({
                key: selection.selection_key,
                value: option.option_sku,
              });
            }}
          >
            <p key={option.id}>{option.option_name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
