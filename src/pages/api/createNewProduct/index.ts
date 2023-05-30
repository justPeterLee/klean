import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/db";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const productData = await req.body;
  let product: Prisma.userCreateInput;

  const newProduct = await prisma.product.create({
    data: {
      product_name: productData.name,
      product_description: productData.description,
      product_price: productData.price,
    },
  });
  console.log(productData);
  console.log(newProduct);
  return res.status(200).json({ hello: "world" });
}
