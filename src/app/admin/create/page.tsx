"use client";
import styles from "../../../styling/Admin.module.css";
import Link from "next/link";
import { CreateForm } from "@/components/AdminPage/AdminComponents";
import { GeneratedSKU } from "@/components/AdminPage/GeneratedSKU";
import AdminImagePreview from "@/components/AdminPage/AdminImagePreview";

import { useState } from "react";
export default function AdminCreate() {
  const [imageFiles, setImagesFiles] = useState<string[]>([]);
  const sendImage = (images: string[]) => {
    setImagesFiles(images);
  };
  return (
    <div className={styles.main}>
      <div className={styles.itemPreview}>
        <AdminImagePreview images={imageFiles} />
        <GeneratedSKU
          data={{
            name: "Piano Tile",
            category: "Computer Mouse",
            selection: [
              {
                selection: "selection 1",
                options: ["color 1", "color 2"],
              },
              {
                selection: "selection 2",
                options: ["dpi 1", "dpi 2", "dpi 3"],
              },
              {
                selection: "selection 3",
                options: ["opt1", "opt2", "opt3"],
              },
            ],
          }}
        />
      </div>
      <CreateForm
        sendImage={sendImage}
        readName={(params: string) => {
          console.log(params);
        }}
        readPrice={(params: number) => {
          console.log(params);
        }}
        readCategory={(params: string) => {
          console.log(params);
        }}
        readDescription={(params: string) => {
          console.log(params);
        }}
        readPoints={(params: string[]) => {
          console.log(params);
        }}
        readSelection={(
          params: { selection: string; options: string[]; skuValue?: string }[]
        ) => {
          console.log(params);
        }}
      />
    </div>
  );
}
