import { NextApiRequest, NextApiResponse } from "next";

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import dotenv from "dotenv";
import crypto from "crypto";

import { createRouter } from "next-connect";
import multer from "multer";

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const randomImangeName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey!,
    secretAccessKey: secretAccessKey!,
  },
  region: bucketRegion,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = createRouter();

router.use(<any>upload.array("files")).post(async (req: any, res: any) => {
  const { productId } = req.body; // Access the productId
  const image = req.files; // Access the uploaded image

  image.map(async (buffer: any) => {
    const fileName = randomImangeName();

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: buffer.buffer,
      ContentType: buffer.mimetype,
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);
  });

  console.log(productId);
  console.log(image);
  return res.status(200).json({ message: "Files uploaded successfully." });
});

router.all((req, res: any) => {
  res.status(405).json({
    error: "Method not allowed",
  });
});

export default router.handler({
  onError(err, req, res: any) {
    res.status(400).json({
      err,
    });
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
