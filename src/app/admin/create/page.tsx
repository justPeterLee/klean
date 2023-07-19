"use client";
import styles from "../../../styling/Admin.module.css";
import Link from "next/link";
import { CreateForm } from "@/components/AdminPage/AdminComponents";
import { GeneratedSKU } from "@/components/AdminPage/GeneratedSKU";
import AdminImagePreview from "@/components/AdminPage/AdminImagePreview";

import { useState, useEffect } from "react";
export default function AdminCreate() {
  // useState - product data instances
  const [imageFiles, setImagesFiles] = useState<Blob[]>([]); // preview image
  const [name, setName] = useState<string>(""); // product name
  const [category, setCategory] = useState<any>(); // product category
  const [selection, setSelection] = useState<
    {
      selection: string;
      options: { option: string; skuValue: string; key: number }[];
      skuValue?: string;
    }[]
  >([]); // selection

  const [price, setPrice] = useState<number>(); // product price
  const [description, setDescription] = useState<string>(); // product description
  const [points, setPoints] = useState<string[]>([]); // technical points
  const [images, setImage] = useState<any>(); // product images
  const [skuArr, setSkuArr] = useState<string[]>([]); // product sku array

  // chain props - product preview
  const sendImage = (images: any[]) => {
    setImagesFiles(images);
  };

  // function - create product instance ( add values to database )
  const createProduct = async () => {
    // input validation
    if (
      name &&
      price &&
      description &&
      category &&
      selection.length &&
      images["product-image"] &&
      images["thumbnail"] &&
      skuArr.length
    ) {
      console.log(images["thumbnail"].images.length);
      // image validation (not empty)
      if (
        images["product-image"].images.length &&
        images["thumbnail"].images.length
      ) {
        console.log("worssking");
        // ----- product insertion -----

        // selection order (for sku encryption)
        const selectionKey = selection.map((select, index) => {
          return { ...select, key: index };
        });

        // product data (inserted into database)
        let newProductData = {
          name: name,
          price: price,
          category: category,
          description: description,
          points: points,
          selection: selectionKey,
          sku: skuArr,
        };
        console.log("asdf", category);

        // request to insert data into database
        const productResponse = await fetch("/api/createNewProduct", {
          method: "POST",
          body: JSON.stringify(newProductData),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(async (response: any) => {
          const responseData = await response.json();
          imageInsertion(images, responseData.product_id);
        });
      }
    } else {
      console.log("failed");
    }
  };

  const imageInsertion = async (images: any, productId: number) => {
    const imageKeys = Object.keys(images);
    const imageFileArray = imageKeys.map((key) => {
      return { imageType: key, files: images[key].images };
    });

    for (let i = 0; i < imageFileArray.length; i++) {
      const imageForm = new FormData();
      imageFileArray[i].files.map((image: any) => {
        imageForm.append("files", image);
      });
      imageForm.append("productId", productId.toString());
      imageForm.append("productImageType", imageFileArray[i].imageType);

      const imageRes = await fetch("/api/createProductImage/image", {
        method: "POST",
        body: imageForm,
      });
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.itemPreview}>
        <AdminImagePreview images={imageFiles} />

        <GeneratedSKU
          data={{
            name: name,
            category: category,
            selection: selection,
          }}
          readSku={(sku: string[]) => {
            setSkuArr(sku);
          }}
        />
      </div>
      <div>
        <CreateForm
          sendImage={sendImage}
          readName={(params: string) => {
            setName(params);
          }}
          readPrice={(params: number) => {
            setPrice(params);
          }}
          readCategory={(params: string) => {
            console.log("cat ", params);
            setCategory(params);
          }}
          readDescription={(params: string) => {
            setDescription(params);
          }}
          readPoints={(params: string[]) => {
            setPoints(params);
          }}
          readSelection={(
            params: {
              selection: string;
              options: { option: string; skuValue: string; key: number }[];
              skuValue?: string;
            }[]
          ) => {
            setSelection(params);
          }}
          readImage={(params: any) => {
            setImage(params);
          }}
        />

        <button onClick={createProduct}>submit</button>
      </div>
    </div>
  );
}
