"use client";
import styles from "../../../styling/Admin.module.css";
import Link from "next/link";
import { CreateForm } from "@/components/AdminPage/AdminComponents";
import { GeneratedSKU } from "@/components/AdminPage/GeneratedSKU";
import AdminImagePreview from "@/components/AdminPage/AdminImagePreview";

import { useState } from "react";
export default function AdminCreate() {
  const [imageFiles, setImagesFiles] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [selection, setSelection] = useState<
    { selection: string; options: string[]; skuValue?: string }[]
  >([]);

  let price;
  let description;
  let points;
  let images;
  let skuArr;
  const sendImage = (images: string[]) => {
    setImagesFiles(images);
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
            console.log(sku);
          }}
        />
      </div>
      <CreateForm
        sendImage={sendImage}
        readName={(params: string) => {
          setName(params);
        }}
        readPrice={(params: number) => {
          price = params;
        }}
        readCategory={(params: string) => {
          console.log(params);
          setCategory(params);
        }}
        readDescription={(params: string) => {
          description = params;
        }}
        readPoints={(params: string[]) => {
          points = params;
        }}
        readSelection={(
          params: { selection: string; options: string[]; skuValue?: string }[]
        ) => {
          setSelection(params);
        }}
        readImage={(params: any) => {
          images = params;
        }}
      />
    </div>
  );
}
