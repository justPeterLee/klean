import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/db";
import { Prisma } from "@prisma/client";

interface productResponse {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  product_name: string;
  product_description: string;
  product_price: number;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, price, category, description, points, selection, images, sku } =
    await req.body;

  let product_id;
  console.log(category);

  await createProduct(name, description, price)
    .then(async (ProductRes: productResponse | undefined) => {
      console.log(ProductRes);
      if (ProductRes) {
        product_id = ProductRes.id;
        await attachCategory(category, ProductRes.id);
        await attactPoint(points, ProductRes.id);
        await attactSelection(selection, ProductRes.id);
        await attachSku(sku, ProductRes.id);
      } else {
        throw console.log("error");
      }
    })
    .catch((err) => {
      res.status(500).json("failed to create product");
    });

  return res.status(200).json({ product_id });
}

/*------------------------------------------------------
attach function
------------------------------------------------------ */

// create product
async function createProduct(name: string, description: string, price: number) {
  try {
    const newProduct = await prisma.product.create({
      data: {
        product_name: name,
        product_description: description,
        product_price: price,
      },
    });

    return newProduct;
  } catch (err) {
    throw console.log("Error with creating inital product instance: ", err);
  }
}

// attach points (if points exists)
async function attactPoint(points: string[], productId: number) {
  try {
    const pointsArr = points.map((point: string) => {
      return { point: point, product_id: productId };
    });

    await prisma.technical_point.createMany({
      data: pointsArr,
    });
  } catch (err) {
    throw console.log("Error with attaching technical points: ", err);
  }
}

// attact selection
async function attactSelection(selection: any[], productId: number) {
  try {
    selection.map(async (select) => {
      const selectionInstance = await prisma.product_selection.create({
        data: {
          selection_name: select.selection,
          selection_key: select.key,
          product_id: productId,
        },
      });

      const optionInstance = select.options.map(
        (option: { key: any; option: string; skuValue: string }) => {
          return {
            option_name: option.option,
            option_sku: `${option.skuValue}${option.key}`,
            selection_id: selectionInstance.id,
          };
        }
      );

      await prisma.product_option.createMany({
        data: optionInstance,
      });
    });
  } catch (err) {
    throw console.log("Error with attaching selections: ", err);
  }
}

// attacth category
async function attachCategory(categoryId: any, productId: number) {
  try {
    await prisma.product_category.create({
      data: {
        product_id: productId,
        category_id: parseInt(categoryId),
      },
    });
  } catch (err) {
    throw console.log("Error with attaching category: ", err);
  }
}

// attact sku values
async function attachSku(sku: string[], productId: number) {
  try {
    const skuArr = sku.map((skuValue: string) => {
      return { product_sku: skuValue, product_id: productId };
    });

    await prisma.product_sku.createMany({
      data: skuArr,
    });
  } catch (err) {
    throw console.log("Error with attaching sku value: ", err);
  }
}
