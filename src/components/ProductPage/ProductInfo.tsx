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
      {/* {data.product_sku.map((sku: any) => JSON.stringify(sku))} */}

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

      <Selection
        selection={data.product_selection}
        sku={data.product_sku}
        available={data.product_sku}
      />

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
  sku: any;
  available: any;
}
function Selection(props: SelectionProps) {
  const { selection, sku, available } = props;
  const [selectionKey, setSelectionKey] = useState<any>(Object.create(null));
  return (
    <div className={styles.SelectionContainer}>
      {selection.map((select: any) => {
        // console.log(select);
        return (
          <Option
            key={select.id}
            selection={select}
            selected={selectionKey[select.selection_key]}
            selectedSku={selectionKey}
            sku={sku}
            readOption={(option: any) => {
              setSelectionKey({ ...selectionKey, [option.key]: option.value });
            }}
          />
        );
      })}
    </div>
  );
}

interface OptionProp {
  selection: any;
  selected: string;
  selectedSku: any;
  sku: any[];
  readOption: (params: { key: string | number; value: string }) => void;
}
function Option(props: OptionProp) {
  const { selection, selected, selectedSku, sku, readOption } = props;
  const skuStructure = sku.map((skuData: any) => {
    const skuValues = skuData.product_sku.split("-");
    skuValues.splice(0, 3);
    // console.log(skuValues);
    return { sku: skuValues, quanity: skuData.quanity };
  });
  // console.log(skuStructure);

  return (
    <div className={styles.OptionMainContainer}>
      {selection.selection_name}

      {/* option */}
      <div className={styles.OptionContiner}>
        {selection.product_option.map((option: any) => {
          let assignSku: any[] = [];

          skuStructure.map((skuStructureArr: any) => {
            if (skuStructureArr.sku.includes(option.option_sku)) {
              assignSku.push(skuStructureArr);
            }
          });

          let assSelectedSku: any[] = [];
          let isInStock = true;
          let proxySelectedSku = { ...selectedSku };
          proxySelectedSku[selection.selection_key] = option.option_sku;

          if (Object.keys(proxySelectedSku).length) {
            assignSku.map((skuArr: any) => {
              let belongs = true;
              for (let key in proxySelectedSku) {
                if (skuArr.sku[key] === proxySelectedSku[key]) {
                  belongs = true;
                } else {
                  belongs = false;
                  break;
                }
              }

              if (belongs) {
                assSelectedSku.push(skuArr);
              }
            });

            for (let obj in assSelectedSku) {
              if (assSelectedSku[obj].quanity) {
                isInStock = true;
                break;
              } else {
                isInStock = false;
              }
            }
          }

          return (
            <button
              style={
                selected === option.option_sku
                  ? { border: "solid 2px rgb(125,125,125)" }
                  : {}
              }
              key={option.id}
              className={styles.OptionButton}
              onClick={() => {
                readOption({
                  key: selection.selection_key,
                  value: option.option_sku,
                });
              }}
              disabled={!isInStock}
            >
              <p key={option.id}>{option.option_name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
