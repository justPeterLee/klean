import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const fileName = req.body;

  fileName.map((file: string) => {
    const imagePath = path.join(process.cwd(), "public", "uploads", file);

    if (fs.existsSync(imagePath)) {
      try {
        // Delete the file
        fs.unlinkSync(imagePath);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete the image." });
      }
    } else {
      res.status(404).json({ error: "Image not found." });
    }
  });
  //   const imagePath = path.join(process.cwd(), "public", "uploads", fileName);

  //   // Check if the file exists

  res.status(200).json({ message: "Image deleted successfully." });
}
