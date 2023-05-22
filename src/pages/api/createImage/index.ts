import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { createRouter } from "next-connect";
import { IncomingMessage } from "http";

type CustomNextApiRequest = NextApiRequest & IncomingMessage;

const router = createRouter<CustomNextApiRequest, NextApiResponse>();

const upload = multer({
  // Disk Storage option
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

router.use(<any>upload.array("files")).post(async (req: any, res) => {
  console.log(req.files);
  const imageFiles = req.files.map(
    (image: { filename: any; originalname: any }) => {
      return { image: image.filename, alt: image.originalname };
    }
  );
  res.status(200).json(imageFiles);
});

router.all((req, res) => {
  res.status(405).json({
    error: "Method not allowed",
  });
});

export default router.handler({
  onError(err, req, res) {
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
