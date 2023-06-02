"use client";
import styles from "../../../styling/Admin.module.css";
import Link from "next/link";
import { CreateForm } from "@/components/AdminPage/AdminComponents";
import { GeneratedSKU } from "@/components/AdminPage/GeneratedSKU";
import AdminImagePreview from "@/components/AdminPage/AdminImagePreview";

import { useState } from "react";
export default function AdminCreate() {
  const [imageFiles, setImagesFiles] = useState<Blob[]>([]);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [selection, setSelection] = useState<
    {
      selection: string;
      options: { option: string; skuValue: string }[];
      skuValue?: string;
    }[]
  >([]);

  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState<string>();
  const [points, setPoints] = useState<string[]>([]);
  const [images, setImage] = useState<any>();
  const [skuArr, setSkuArr] = useState<string[]>([]);

  const sendImage = (images: any[]) => {
    setImagesFiles(images);
  };

  const createProduct = async () => {
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
      if (
        images["product-image"].images.length &
        images["thumbnail"].images.length
      ) {
        const selectionKey = selection.map((select, index) => {
          return { ...select, key: index };
        });

        let newProductData = {
          name: name,
          price: price,
          category: category,
          description: description,
          points: points,
          selection: selectionKey,
          sku: skuArr,
        };

        const productResponse = await fetch("/api/createNewProduct", {
          method: "POST",
          body: JSON.stringify(newProductData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const productId = await productResponse.json();

        const imageForm = new FormData();
        images["product-image"].images.map((image: any) => {
          imageForm.append("files", image);
        });
        imageForm.append("productId", productId.product_id);

        const imageRes = await fetch("/api/createProductImage/image", {
          method: "POST",
          body: imageForm,
        });

        console.log(productId);
      }
    } else {
      console.log("failed");
    }

    const imageFetch = await fetch(`/api/createProductImage/${"word"}`, {
      method: "GET",
    });

    // console.log(imageFetch.text);
    const fetchedImage = await imageFetch.json();
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
            console.log(params);
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
              options: { option: string; skuValue: string }[];
              skuValue?: string;
            }[]
          ) => {
            setSelection(params);
          }}
          readImage={(params: any) => {
            console.log(params);
            setImage(params);
          }}
        />

        <button onClick={createProduct}>submit</button>
      </div>
    </div>
  );
}
