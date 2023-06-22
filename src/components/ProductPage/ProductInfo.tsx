"use client";
import { useState, useContext, useEffect } from "react";
import styles from "../../styling/Product.module.css";
import { MyContext } from "../ClientContext";
import { CartContext } from "../Context/CartContext";
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
    imageFiles: { file: string; name: string }[];
    review: any[];
  };
}

interface SelectionType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  product_id: number;
  selection_description: string | null;
  selection_key: number | null;
  selection_name: string | null;
  product_option: OptionType[] | null;
}

interface OptionType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  selection_id: number;
  option_description: null | string;
  option_name: string | null;
  option_sku: string | null;
}

interface ImageType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  image_description: string | null;
  image_file: string | null;
  image_name: string | null;
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

  // get thumbnail
  const thumbnail = data.images.filter((images: any) => {
    return images.image_name === "thumbnail";
  })[0];

  const [productSku, setProductSku] = useState<any>();

  //turn selection into sku
  const decryptSku = (sku: any) => {
    const proxySku: string[] = data.SKUs[0].product_sku.split("-").splice(0, 3);
    if (Object.keys(sku).length) {
      for (let key in sku) {
        proxySku.push(sku[key]);
      }
    }
    setProductSku(proxySku.join("-"));
  };

  // add item to selection
  const addToCart = async () => {
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
          image: thumbnail.image_file,
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
        context?.setCartState(true);
      } else {
        console.log("out of stock");
      }
    } else {
      console.log("failed");
    }
  };

  return (
    <div className={styles.ProductInfoContainer}>
      {/* general information (name, price, category, favoirte(button)) */}
      <div className={styles.ProductGeneralContainer}>
        <span className={styles.NamePrice}>
          <p id={styles.name}>{data.name}</p>
          <p id={styles.price}>${data.price}</p>
        </span>

        <span className={styles.Category}>{data.category}</span>

        <button className={styles.Favorite}>{"<3"}</button>
      </div>

      <LINEBREAK />
      {/* selection (selection, options) */}

      {JSON.stringify(productSku)}
      <Selection
        selection={data.selection}
        sku={data.SKUs}
        available={data.SKUs}
        readOption={(params) => {
          decryptSku(params);
        }}
      />

      <button className={styles.AddToCartButton} onClick={addToCart}>
        add to cart
      </button>

      <LINEBREAK />

      {/* description (description, technical points) */}
      <div className={styles.ProductDescriptionContainer}>
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
    </div>
  );
}

function LINEBREAK() {
  return <div className={styles.line}></div>;
}

interface SelectionProps {
  //   selection?: {}[];
  selection: SelectionType[];
  sku: SkuType[];
  available: SkuType[];
  readOption: (params: any) => void;
}
function Selection(props: SelectionProps) {
  const { selection, sku, available, readOption } = props;
  const [selectionKey, setSelectionKey] = useState<any>(Object.create(null));
  return (
    <div className={styles.SelectionContainer}>
      {selection.map((select: any) => {
        // console.log(select);
        return (
          <Option
            key={select.id}
            selection={select}
            selected={selectionKey[select.selection_key]}
            selectedSku={selectionKey}
            sku={sku}
            readOption={(option: any) => {
              setSelectionKey({ ...selectionKey, [option.key]: option.value });
              readOption({ ...selectionKey, [option.key]: option.value });
            }}
          />
        );
      })}
    </div>
  );
}

interface OptionProp {
  selection: SelectionType;
  selected: string;
  selectedSku: any;
  sku: any[];
  readOption: (params: { key: string | number; value: string }) => void;
}
function Option(props: OptionProp) {
  const { selection, selected, selectedSku, sku, readOption } = props;
  const skuStructure = sku.map((skuData: any) => {
    const skuValues = skuData.product_sku.split("-");
    skuValues.splice(0, 3);
    // console.log(skuValues);
    return { sku: skuValues, quanity: skuData.quanity };
  });
  // console.log(skuStructure);

  return (
    <div className={styles.OptionMainContainer}>
      {selection.selection_name}

      {/* option */}
      <div className={styles.OptionContiner}>
        {selection.product_option ? (
          selection.product_option.map((option: any) => {
            let assignSku: any[] = [];

            skuStructure.map((skuStructureArr: any) => {
              if (skuStructureArr.sku.includes(option.option_sku)) {
                assignSku.push(skuStructureArr);
              }
            });

            let assSelectedSku: any[] = [];
            let isInStock = true;
            let proxySelectedSku = { ...selectedSku };
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
                  selected === option.option_sku
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
