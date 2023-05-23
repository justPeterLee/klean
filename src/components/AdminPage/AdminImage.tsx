"use client";
import styles from "../../styling/Admin.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AdminImage() {
  const [imageFiles, setImageFiles] = useState<any>([]);

  // on photo change
  const handleImage = async (event: any) => {
    console.log(event.target.files);
    console.log(typeof event.target.files);

    uploadImage(event.target.files);
  };

  // upload image to disk
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

    // const data = await request.json();
    fetchImage();
  };

  // fetch image from disk
  const fetchImage = async () => {
    const response = await fetch("/api/fetchImage", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setImageFiles(data.images);
  };

  useEffect(() => {
    fetchImage();
    // console.log(imageFiles);
  }, []);
  return (
    <div className={styles.image}>
      <form encType="multipart/form-data">
        <label htmlFor="upload-image">upload image</label>
        <input
          id="upload-image"
          type="file"
          multiple
          accept="image/*"
          name="uploadedImages"
          onChange={handleImage}
        />
        <p>{imageFiles.length}</p>
      </form>
      <div className={styles.imageContainer}>
        {imageFiles.map((image: string, index: number) => (
          <ImageItem key={index} image={image} fetchImage={fetchImage} />
        ))}
      </div>
    </div>
  );
}

function ImageItem({
  image,
  fetchImage,
}: {
  image: string;
  fetchImage: () => void;
}) {
  const [isHover, setIsHover] = useState(false);
  const deleteImage = async (imageFile: string) => {
    const response = await fetch("/api/removeImage", {
      method: "POST",
      body: JSON.stringify(imageFile),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        fetchImage();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <button
      onClick={() => {
        deleteImage(image);
      }}
      className={styles.imageButton}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <p style={isHover ? { color: "rgba(255, 255, 255)" } : {}}>remove</p>
      <div
        style={isHover ? { backgroundColor: "rgb(0, 0, 0, 0.3)" } : {}}
      ></div>
      <Image
        src={`/uploads/${image}`}
        alt={image}
        width={130}
        height={100}
        className={styles.image}
      />
    </button>
  );
}
