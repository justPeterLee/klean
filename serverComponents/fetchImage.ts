import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default async function fetchImage(key: string) {
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
  const getObjectParams = {
    Bucket: bucketName,
    Key: key?.toString(),
  };
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return url;
}
