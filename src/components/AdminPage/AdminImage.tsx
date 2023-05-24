"use client";
import styles from "../../styling/Admin.module.css";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function AdminImage({
  sendImage,
}: {
  sendImage: (params: string[]) => void;
}) {
  const [imageFiles, setImageFiles] = useState<any>([]);
  const [stageImageFiles, setStagedImageFiles] = useState<any>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addImageModal, setAddImageModal] = useState(false);

  const [imageType, setImageType] = useState("product-image");
  const [imageDescription, setImageDescription] = useState<string>();

  // on photo change
  const handleImage = async (event: any, isStaged: boolean) => {
    uploadImage(event.target.files, isStaged);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // upload image to disk
  const uploadImage = async (files: any, isStaged: boolean) => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append(`files`, files[i]);
    }

    const request = await fetch("/api/createImage", {
      method: "POST",
      body: formData,
    });

    // const data = await request.json();
    fetchImage(isStaged);
  };

  // fetch image from disk
  const fetchImage = async (isStaged: boolean) => {
    const response = await fetch("/api/fetchImage", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (isStaged) {
      setStagedImageFiles(data.images);
    } else {
      //   setImageFiles({
      //     imageType: imageType,
      //     imageDescription: imageDescription,
      //     images: data.images,
      //   });
      setImageFiles(data.images);
      sendImage(data.images);
    }
  };

  // delete all images on disk
  const deleteAllImages = async () => {
    const response = await fetch("/api/deleteAllImages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setImageFiles([]);
    sendImage([]);
  };

  const deleteSectionImage = async () => {
    const response = await fetch("/api/removeSectionImages", {
      method: "POST",
      body: JSON.stringify(stageImageFiles),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setStagedImageFiles([]);
  };

  useEffect(() => {
    deleteAllImages();
  }, []);
  return (
    <div className={styles.image}>
      {addImageModal && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => {
              setAddImageModal(false);
              setStagedImageFiles([]);
            }}
          />

          <span className={styles.addImageModal}>
            {stageImageFiles.length ? (
              <div className={styles.imageModalImagesContainer}>
                <span
                  className={
                    stageImageFiles.length === 1
                      ? styles.imageModalImages
                      : stageImageFiles.length === 2
                      ? styles.imageModalImagesTwo
                      : stageImageFiles.length >= 3
                      ? styles.imageModalImagesThree
                      : styles.imageModalImagesThree
                  }
                >
                  {stageImageFiles.map((image: string, index: number) => (
                    <Image
                      key={index}
                      src={`/uploads/${image}`}
                      alt={image}
                      width={300}
                      height={300}
                      className={
                        stageImageFiles.length === 1
                          ? styles.imageOne
                          : stageImageFiles.length === 2
                          ? styles.imageTwo
                          : stageImageFiles.length >= 3
                          ? styles.imageThree
                          : styles.imageThree
                      }
                    />
                  ))}
                </span>
              </div>
            ) : (
              <form
                encType="multipart/form-data"
                className={styles.imageInputForm}
              >
                <label
                  htmlFor="upload-image"
                  className={styles.imageInputLabel}
                >
                  upload image
                </label>
                <input
                  id="upload-image"
                  className={styles.imageInput}
                  type="file"
                  multiple
                  accept="image/*"
                  name="uploadedImages"
                  ref={fileInputRef}
                  onChange={(e) => {
                    handleImage(e, true);
                  }}
                />
              </form>
            )}

            <div className={styles.imageModalInfo}>
              <div className={styles.imageModalInfoInput}>
                <span className={styles.modalInputSpan}>
                  <label>description</label>
                  <input
                    value={imageDescription}
                    onChange={(e) => {
                      setImageDescription(e.target.value);
                    }}
                    className={styles.modalInput}
                    placeholder="(optional)"
                  />
                </span>

                <span className={styles.modalInputSpan}>
                  <label>image type</label>
                  <select
                    className={styles.category}
                    name={"image-type"}
                    onChange={(e) => {
                      setImageType(e.target.value);
                    }}
                  >
                    <option value={"product-image"}>
                      product image (default)
                    </option>
                    <option value={"thumbnail"}>thumbnail</option>
                    <option value={"feature"}>feature</option>
                  </select>
                </span>
              </div>

              <div className={styles.imageModalButtons}>
                <button
                  onClick={() => {
                    if (stageImageFiles.length) {
                      deleteSectionImage();
                    }
                    setAddImageModal(false);
                    setStagedImageFiles([]);
                  }}
                >
                  cancel
                </button>
                <button
                  onClick={() => {
                    setAddImageModal(false);
                    fetchImage(false);
                    setStagedImageFiles([]);
                  }}
                  disabled={!stageImageFiles.length}
                >
                  add
                </button>
              </div>
            </div>
          </span>
        </>
      )}
      <button
        onClick={() => {
          setAddImageModal(true);
        }}
      >
        add image
      </button>
      <div className={styles.imageContainer}>
        {imageFiles.map((image: string, index: number) => (
          <ImageItem
            key={index}
            image={image}
            fetchImage={() => {
              fetchImage(false);
            }}
          />
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
        height={130}
        className={styles.image}
      />
    </button>
  );
}
