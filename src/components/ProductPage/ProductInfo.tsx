"use client";
import { useState, useContext, useEffect } from "react";
import styles from "../../styling/Product.module.css";
import { MyContext } from "../ClientContext";
import { CartContext } from "../Context/CartContext";
import ProductReview from "./ProductReview";

interface ProductInfoProps {
  data: {
    id: number;
    name: string;
    price: number;
    category: any;
    description: string;
    technical: TechnicalType[];
    selection: SelectionType[];
    SKUs: SkuType[];
    images: ImageType[];
    image_files: {
      key: string;
      file: string;
      name: string;
    }[];
    review: any[];
  };
}

interface SelectionType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  product_id: number;
  selection_description: string;
  selection_key: number;
  selection_name: string;
  product_option: OptionType[];
}

interface OptionType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  selection_id: number;
  option_description: string;
  option_name: null;
  option_sku: string;
}

interface ImageType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  image_description: string;
  image_file: string;
  image_name: string;
  product_id: number;
}

interface TechnicalType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  product_id: number;
  point: string;
}

interface SkuType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  product_id: number;
  product_sku: string;
  quanity: number;
}

export default function ProductInfo(props: ProductInfoProps) {
  const { data } = props;
  const context = useContext(MyContext);
  const cartContext = useContext(CartContext);

  // selected SKU
  const [productSku, setProductSku] = useState<string>();
  // selected section
  const [productSkuSelection, setProductSkuSelection] = useState<any>([]);
  // selection error
  const [selectionError, setSelectionError] = useState(false);

  // get thumbnail
  const thumbnail = data.image_files.filter((images: any) => {
    return images.name === "thumbnail";
  })[0];

  //turn selection into sku
  const decryptSku = (sku: any) => {
    // gets starting of sku (will be same with all sku (specific products))
    const initialSku: string[] = data.SKUs[0].product_sku
      .split("-")
      .splice(0, 3);

    const selectedSection = [];
    // iterate through selected sku obj -> push each value into array
    if (Object.keys(sku).length) {
      for (let key in sku) {
        initialSku.push(sku[key].value);
        selectedSection.push(sku[key].selection);
      }
    }

    setProductSkuSelection(selectedSection);
    // join array to get structured sku
    setProductSku(initialSku.join("-"));
  };

  // add item to selection
  const addToCart = async () => {
    setSelectionError(false);

    // compares and returns selected sku from db
    const selectedSKU = data.SKUs.filter((sku: any) => {
      return sku.product_sku === productSku;
    });

    // sku condition check ( make sure sku exists)
    if (selectedSKU.length) {
      // quantity check ( make sure specific sku is "in-stock")
      if (selectedSKU[0].quanity) {
        // create instance of cart data (will be passed to cart component )
        const productData = {
          id: data.id,
          name: data.name,
          category: data.category,
          price: data.price,
          image: thumbnail.key,
          skuId: selectedSKU[0].id,
        };

        // show the newly added item (newest item added)
        context?.getNewCartItem(productData);
        // get the current cart (stored in local storage)
        const currentCart: string | null = window.localStorage.getItem("cart");
        // parse current cart
        const newCart = currentCart && JSON.parse(currentCart);

        // check if you already have this specific item in your cart
        if (newCart) {
          const cartFilter = newCart.filter(
            (item: any) => item.skuId === productData.skuId
          );
          if (cartFilter.length) {
            const updatedCart = newCart.map((item: any) => {
              if (item === cartFilter[0]) {
                return { ...item, quantity: item.quantity + 1 };
              } else {
                return item;
              }
            });

            window.localStorage.setItem("cart", JSON.stringify(updatedCart));
          } else {
            window.localStorage.setItem(
              "cart",
              JSON.stringify([...newCart, { ...productData, quantity: 1 }])
            );
          }

          cartContext?.initalCart();
        } else {
          window.localStorage.setItem(
            "cart",
            JSON.stringify([{ ...productData, quantity: 1 }])
          );
          cartContext?.initalCart();
        }
        context?.toggleCartOn();
      } else {
        console.log("out of stock");
      }
    } else {
      setSelectionError(true);
      console.log(productSku);
      console.log("failed");
    }
  };

  return (
    <div className={styles.ProductInfoContainer}>
      {/* general information (name, price, category, favoirte(button)) */}
      <div className={styles.ProductGeneralContainer}>
        <span className={styles.nameCatContainer}>
          <p id={styles.name}>{data.name}</p>
          <p className={styles.Category}>{data.category}</p>
        </span>

        <p id={styles.price}>${data.price}</p>
      </div>
      <LINEBREAK marginTop={-20} />

      {/* selection (selection, options) */}
      <div>
        <Selection
          selection={data.selection}
          selectedSection={productSkuSelection}
          sku={data.SKUs}
          error={selectionError}
          readOption={(params) => {
            decryptSku(params);
          }}
        />
      </div>
      <button className={styles.AddToCartButton} onClick={addToCart}>
        add to cart
      </button>
      <LINEBREAK />

      {/* description (description, technical points) */}
      <div className={styles.ProductDescriptionContainer}>
        <p className={styles.ProductSectionTitle}>Description</p>
        <span className={styles.Description}>
          <p>{data.description}</p>
        </span>
        <span className={styles.Technical}>
          <ul className={styles.TechnicalUl}>
            {data.technical.map((point, index) => (
              <li key={index}>{point.point}</li>
            ))}
          </ul>
        </span>
      </div>

      <LINEBREAK />

      {/* review */}
      <ProductReview productId={data.id} />
      <LINEBREAK />
    </div>
  );
}

export function LINEBREAK(props: { marginTop?: number; marginBot?: number }) {
  const { marginTop, marginBot } = props;
  return (
    <div
      className={styles.line}
      style={{ marginTop: `${marginTop}px`, marginBottom: `${marginBot}px` }}
    ></div>
  );
}

interface SelectionProps {
  selection: SelectionType[];
  selectedSection: string[];
  sku: SkuType[];
  error: boolean;
  readOption: (params: any) => void;
}
function Selection(props: SelectionProps) {
  const { selection, selectedSection, sku, error, readOption } = props;
  const [selectionKey, setSelectionKey] = useState<any>(Object.create(null));
  useEffect(() => {
    console.log(selection);
  }, []);
  return (
    <div className={styles.SelectionContainer}>
      {selection.map((select: any) => {
        return (
          <Option
            key={select.id}
            selection={select}
            selected={selectionKey[select.selection_key]}
            selectedSku={selectionKey}
            sku={sku}
            readOption={(option: any) => {
              setSelectionKey({
                ...selectionKey,
                [option.key]: {
                  value: option.value,
                  selection: select.selection_name,
                },
              });
              readOption({
                ...selectionKey,
                [option.key]: {
                  value: option.value,
                  selection: select.selection_name,
                },
              });
            }}
            selectedSection={selectedSection}
            error={error}
          />
        );
      })}
    </div>
  );
}

interface OptionProp {
  selection: SelectionType;
  selected: { value: string; selection: string };
  selectedSku: any;
  sku: any[];
  readOption: (params: { key: string | number; value: string }) => void;

  selectedSection: string[];
  error: boolean;
}
function Option(props: OptionProp) {
  const {
    selection,
    selected,
    selectedSku,
    sku,
    readOption,
    selectedSection,
    error,
  } = props;

  // all varients of sku
  const skuStructure = sku.map((skuData: any) => {
    const skuValues = skuData.product_sku.split("-");

    skuValues.splice(0, 3);
    return { sku: skuValues, quanity: skuData.quanity };
  });

  return (
    <div className={styles.OptionMainContainer}>
      {error ? (
        !selectedSection.includes(selection.selection_name) ? (
          <p>error</p>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
      <p className={styles.SelectionTitle}>{selection.selection_name}</p>
      {/* option */}
      <div className={styles.OptionContiner}>
        {selection.product_option ? (
          selection.product_option.map((option: any) => {
            // if option sku consist of varient sku, assign them that sku varient
            let assignSku: any[] = [];

            skuStructure.map((skuStructureArr: any) => {
              if (skuStructureArr.sku.includes(option.option_sku)) {
                assignSku.push(skuStructureArr);
              }
            });

            // recreate selected sku with varient value -> allowing to see if product is in stock (ahead of time)
            let assSelectedSku: any[] = [];
            let isInStock = true;
            let proxySelectedSku: any = {};
            if (Object.keys(selectedSku).length) {
              for (let key in selectedSku) {
                proxySelectedSku[key] = selectedSku[key].value;
              }
            }
            proxySelectedSku[selection.selection_key!] = option.option_sku;

            if (Object.keys(proxySelectedSku).length) {
              assignSku.map((skuArr: any) => {
                let belongs = true;
                for (let key in proxySelectedSku) {
                  if (skuArr.sku[key] === proxySelectedSku[key]) {
                    belongs = true;
                  } else {
                    belongs = false;
                    break;
                  }
                }

                if (belongs) {
                  assSelectedSku.push(skuArr);
                }
              });

              for (let obj in assSelectedSku) {
                if (assSelectedSku[obj].quanity) {
                  isInStock = true;
                  break;
                } else {
                  isInStock = false;
                }
              }
            }

            return (
              <button
                style={
                  selected && selected.value === option.option_sku
                    ? { border: "solid 2px rgb(125,125,125)" }
                    : {}
                }
                key={option.id}
                className={styles.OptionButton}
                onClick={() => {
                  readOption({
                    key: selection.selection_key!,
                    value: option.option_sku,
                  });
                }}
                disabled={!isInStock}
              >
                <p key={option.id}>{option.option_name}</p>
              </button>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
