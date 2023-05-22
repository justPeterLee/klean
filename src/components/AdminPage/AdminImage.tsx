"use client";
import styles from "../../styling/Admin.module.css";
import { useState } from "react";
import Image from "next/image";

export default function AdminImage() {
  const [imageFiles, setImageFiles] = useState<any>([]);
  const handleImage = async (event: any) => {
    console.log(event.target.files);
    console.log(typeof event.target.files);

    uploadImage(event.target.files);
  };

  const uploadImage = async (files: any) => {
    console.log("hello");
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      formData.append(`files`, files[i]);
    }

    const request = await fetch("/api/createImage", {
      method: "POST",
      body: formData,
    });

    const data = await request.json();
    setImageFiles(data);
  };

  return (
    <div className={styles.image}>
      <form encType="multipart/form-data">
        <input
          type="file"
          multiple
          accept="image/*"
          name="uploadedImages"
          onChange={handleImage}
        />
      </form>

      {imageFiles.map((image: { image: any; alt: any }, index: number) => (
        <Image
          key={index}
          src={`/uploads/${image.image}`}
          alt={image.alt}
          width={500}
          height={300}
        />
      ))}
    </div>
  );
}
