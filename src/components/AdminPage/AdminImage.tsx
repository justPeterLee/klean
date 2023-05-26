"use client";
import styles from "../../styling/Admin.module.css";
import { useEffect, useState, useRef, Fragment } from "react";
import Image from "next/image";

export default function AdminImage({
  sendImage,
  readImage,
}: {
  sendImage: (params: string[]) => void;
  readImage: (params: any) => void;
}) {
  const [imageFiles, setImageFiles] = useState<any>({});
  const [stageImageFiles, setStagedImageFiles] = useState<any>([]);
  const [addImageModal, setAddImageModal] = useState(false);

  const [imageType, setImageType] = useState("product-image");
  const [imageDescription, setImageDescription] = useState<string>();

  // on photo change
  const handleImage = async (event: any) => {
    const files = event.target.files;
    const selectedImagesArray = Array.from(files);
    if (stageImageFiles.length) {
      let proxyArr = stageImageFiles;
      selectedImagesArray.map((image: any) => {
        proxyArr.push(image);
      });
      const updatedArr = proxyArr.map((image: any) => image);
      setStagedImageFiles(updatedArr);
    } else {
      setStagedImageFiles(selectedImagesArray);
    }
  };

  // upload image to disk
  const uploadImage = async () => {
    let proxyArr: string[] = [];

    const formData = new FormData();

    for (let i = 0; i < stageImageFiles.length; i++) {
      formData.append(`files`, stageImageFiles[i]);
      proxyArr.push(stageImageFiles[i].name);
    }

    const request = await fetch("/api/createImage", {
      method: "POST",
      body: formData,
    }).then(() => {
      commitImage(proxyArr);
    });
  };

  // commit images
  const commitImage = async (images: string[]) => {
    let proxyArr: string[] = [];
    if (!imageFiles[imageType]) {
      proxyArr = images.map((image) => image);
    } else {
      proxyArr = imageFiles[imageType].images;
      images.map((image) => {
        proxyArr.push(image);
      });
    }

    const updatedImages = {
      ...imageFiles,
      [imageType]: {
        images: proxyArr,
        description: imageDescription,
      },
    };

    setImageFiles(updatedImages);
    readImage(updatedImages);

    if (imageType === "product-image") {
      sendImage(proxyArr);
    }

    setImageType("product-image");
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
    sendImage(data.images);
  };

  // delete all images on disk
  const deleteAllImages = async () => {
    const response = await fetch("/api/deleteAllImages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setImageFiles({});
    readImage({});
    sendImage([]);
  };

  //   const deleteSectionImage = async () => {
  //     const response = await fetch("/api/removeSectionImages", {
  //       method: "POST",
  //       body: JSON.stringify(stageImageFiles),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     setStagedImageFiles([]);
  //   };

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
                  className={styles.imageModalImages}
                  style={{
                    gridTemplate: `repeat(${
                      Math.floor(stageImageFiles.length / 3) + 1
                    }, 100px) / repeat(3, 33%)`,
                  }}
                >
                  <ImageInputForm handleImage={handleImage} isButton={true} />
                  {stageImageFiles.map((image: Blob, index: number) => (
                    <button
                      className={styles.imageButton}
                      key={index}
                      onClick={() => {
                        let proxyArr = stageImageFiles;
                        proxyArr.splice(index, 1);
                        const updatedArr = proxyArr.map((image: any) => image);
                        setStagedImageFiles(updatedArr);
                      }}
                    >
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={`Selected Image ${index}`}
                        width={100}
                        height={100}
                        className={styles.imageOne}
                      />
                    </button>
                  ))}
                </span>
              </div>
            ) : (
              <ImageInputForm handleImage={handleImage} isButton={false} />
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
                    value={imageType}
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
                      setStagedImageFiles([]);
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
                    uploadImage();
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
        className={styles.technicalAdd}
        id={styles.technicalButton}
        onClick={() => {
          setAddImageModal(true);
        }}
      >
        add image
      </button>
      <div className={styles.imageContainerMain}>
        {Object.keys(imageFiles).length ? (
          Object.keys(imageFiles).map((imageType: string, index: number) => (
            <Fragment key={index}>
              <p>{imageType}</p>
              <div key={index} className={styles.imageContainer}>
                {imageFiles[imageType].images.map(
                  (image: string, index: number) => (
                    <ImageItem
                      key={index}
                      image={image}
                      index={index}
                      refeshArr={(data) => {
                        let proxyArr = imageFiles[imageType].images;
                        proxyArr.splice(data, 1);
                        const updatedArr = proxyArr.map(
                          (image: string) => image
                        );

                        const updatedImages = {
                          ...imageFiles,
                          [imageType]: {
                            images: updatedArr,
                            description: imageFiles[imageType].description,
                          },
                        };
                        setImageFiles(updatedImages);
                        readImage(updatedImages);
                      }}
                    />
                  )
                )}
              </div>
            </Fragment>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function ImageItem({
  image,
  index,
  refeshArr,
}: {
  image: string;
  refeshArr: (param: number) => void;
  index: number;
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
        refeshArr(index);
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

function ImageInputForm({
  handleImage,
  isButton,
}: {
  handleImage: (params: any) => void;
  isButton: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sendImageFiles = (e: any) => {
    handleImage(e);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <form
      encType="multipart/form-data"
      className={styles.imageInputForm}
      id={isButton ? styles.isButtonForm : ""}
    >
      <label
        htmlFor="upload-image"
        className={styles.imageInputLabel}
        id={isButton ? styles.isButtonForm : ""}
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
          sendImageFiles(e);
        }}
      />
    </form>
  );
}
