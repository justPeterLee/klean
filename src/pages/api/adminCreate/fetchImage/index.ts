import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const imageDirectory = path.join(process.cwd(), "public", "uploads");
  // Read the contents of the image directory
  fs.readdir(imageDirectory, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to read images directory." });
    } else {
      // Filter out any non-image files if necessary
      const imageFiles = files.filter(
        (file) =>
          file.endsWith(".jpg") ||
          file.endsWith(".png") ||
          file.endsWith(".jpeg")
      );

      // Send the list of image files to the client
      res.status(200).json({ images: imageFiles });
    }
  });
}
