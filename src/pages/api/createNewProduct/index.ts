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
  const { name, price, category, description, points, selection, images } =
    await req.body;

  createProduct(name, description, price)
    .then((ProductRes: productResponse | undefined) => {
      console.log(ProductRes);
    })
    .catch((err) => {
      res.status(500).json("failed to create product instance");
    });

  return res.status(200).json({ hello: "world" });
}

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
    console.log("Error with creating inital product instance: ", err);
    throw err;
  }
}

// attach points (if points exists)
async function attactPoint(points: string[], productInstance: any) {
  try {
  } catch (err) {
    console.log("Error with attaching technical points: ", err);
    throw err;
  }
}

// attact selection
async function attactSelection(selection: any[], productInstance: any) {
  try {
  } catch (err) {
    console.log("Error with attaching selections: ", err);
    throw err;
  }
}

// attach options
async function attactOption(selectionInstance: any, option: string[]) {
  try {
  } catch (err) {
    console.log("Error with attion options: ", err);
    throw err;
  }
}
