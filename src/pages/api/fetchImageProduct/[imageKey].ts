import { NextApiRequest, NextApiResponse } from "next";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey!,
    secretAccessKey: secretAccessKey!,
  },
  region: bucketRegion,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { imageKey } = req.query;
  const key = imageKey;

  try {
    const getObjectParams = {
      Bucket: bucketName,
      Key: key?.toString(),
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return res.status(200).json(url);
  } catch (error) {
    console.error("Error fetching image from S3:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
