import prisma from "../../../../lib/db";

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

router
  .use(<any>upload.array("files"))
  .post(async (req: any, res: any) => {
    const { productId } = req.body; // Access the productId
    const { productImageType } = req.body; // Access the productId
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

      await prisma.image.create({
        data: {
          image_file: fileName,
          image_name: productImageType,
          image_description: "",
          product_id: parseInt(productId),
        },
      });
    });

    return res.status(200).json({ message: "Files uploaded successfully." });
  })
  .get(async (req: any, res: any) => {
    const getObjectParams = {
      Bucket: bucketName,
      Key: "05cf089cea4d58599b11ccb9fc0d4708de8f85d8f6bc80f69ff524248c6869d3",
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return res.send(url);
  });

router.all((req, res: any) => {
  return res.status(405).json({
    error: "Method not allowed",
  });
});

export default router.handler({
  onError(err, req, res: any) {
    return res.status(400).json({
      err,
    });
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
