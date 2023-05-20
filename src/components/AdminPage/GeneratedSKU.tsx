"use client";
import styles from "../../styling/Admin.module.css";
import { useEffect, useState } from "react";

interface GeneratedSKUProps {
  data: {
    name: string;
    category: string;
    selection: { selection: string; options: string[]; skuValue?: string }[];
  };
}
export function GeneratedSKU(props: GeneratedSKUProps) {
  const { name, category, selection } = props.data;
  const [generatedSKU, setGeneratedSKU] = useState([]);

  const templateSKU = (str: string) => {
    let string = str
      .replace(/\s/g, "")
      .replace(/[aeiou]/gi, "")
      .toUpperCase()
      .substring(0, 4);

    return string;
  };

  const createSKU = () => {
    const nameSKU = templateSKU(name);
    const catSKU = templateSKU(category);
    const selectionNum = selection.length;
    let selectionSKU = selection.map((select) => {
      return templateSKU(select.selection);
    });
    let optionSKU: string[] = [];

    const blockLimiter = selection.length;
    for (let i = 0; i < selection[0].options.length; i++) {
      // main option
      console.log("main: ", selection[0].options[i]);
      for (let k = 1; k < selection.length; k++) {
        // selection block added
        for (let l = 0; l < selection[k].options.length; l++) {
          // sub option
          console.log(selection[k].options[l]);
        }
      }
    }

    // selection.map((select) => {
    //   console.log(select);
    //   select.options.map((opt) => {
    //     console.log(templateSKU(opt));
    //     optionSKU.push(templateSKU(opt));
    //   });
    // });

    // console.log(`${selectionNum}-${nameSKU}-${catSKU}`);
    // console.log(optionSKU);
  };
  useEffect(() => {
    createSKU();
  }, []);
  return (
    <div>
      <p>generated SKU</p>
      <p>{name}</p>
      <p>{category}</p>
      <p>{}</p>
    </div>
  );
}

/*
1) remove vowels
2) remove white space 
3) take first 4 letters (at most)


*/
