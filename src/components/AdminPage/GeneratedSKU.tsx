"use client";
import styles from "../../styling/Admin.module.css";
import { useEffect, useState } from "react";

interface GeneratedSKUProps {
  data: {
    name: string;
    category: string;
    selection: {
      selection: string;
      options: {
        key: number;
        option: string;
        skuValue: string;
      }[];
      skuValue?: string;
    }[];
  };
  readSku: (params: string[]) => void;
}
export function GeneratedSKU(props: GeneratedSKUProps) {
  const { name, category, selection } = props.data;
  const { readSku } = props;
  const [generatedSKU, setGeneratedSKU] = useState<string[]>([]);

  const templateSKU = (str: string) => {
    let string = str
      .replace(/\s/g, "")
      .replace(/[aeiou]/gi, "")
      .toUpperCase()
      .substring(0, 4);

    return string;
  };

  function iterateArrays(
    arrays: string[][],
    currentIndex: number = 0,
    currentCombination: string[] = [],
    allCombinations: string[] = []
  ) {
    if (currentIndex === arrays.length) {
      allCombinations.push(currentCombination.join("-"));
      return;
    }

    const currentArray = arrays[currentIndex];

    for (let i = 0; i < currentArray.length; i++) {
      const currentElement = currentArray[i];
      currentCombination.push(currentElement);
      iterateArrays(
        arrays,
        currentIndex + 1,
        currentCombination,
        allCombinations
      );
      currentCombination.pop();
    }

    return allCombinations;
  }

  const createSKU = () => {
    const nameSKU = templateSKU(name);
    const catSKU = category;
    const selectionNum = selection.length;

    let optionArr: string[][] = [];
    let currOptionArr: string[] = [];

    if (selection.length !== 0) {
      for (let i = 0; i < selection.length; i++) {
        for (let j = 0; j < selection[i].options.length; j++) {
          currOptionArr.push(
            `${templateSKU(selection[i].options[j].option)}${
              selection[i].options[j].key
            }`
          );
        }
        optionArr.push(currOptionArr);
        currOptionArr = [];
      }

      let optionSKUValues = iterateArrays(optionArr);

      const skuValues: string[] = optionSKUValues!.map((sku) => {
        return `${selectionNum}-${name ? nameSKU : "(no name)"}-${
          category && `${catSKU}`
        }-${sku}`;
      });
      setGeneratedSKU(skuValues);
      readSku(skuValues);
    } else {
      const proxySku = [
        `${selectionNum}-${name ? nameSKU : "(no name)"}-${
          category && `${catSKU}`
        }`,
      ];
      setGeneratedSKU(proxySku);
      readSku(proxySku);
    }
  };

  useEffect(() => {
    createSKU();
  }, [name, category, selection]);
  return (
    <div className={styles.genSkuMainContainer}>
      <p>Generated Sku ({generatedSKU.length})</p>
      <div className={styles.genSkuContainer}>
        {generatedSKU.map((sku, index) => (
          <p key={index}>{sku}</p>
        ))}
      </div>
    </div>
  );
}
