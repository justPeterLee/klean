import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const imageDirectory = path.join(process.cwd(), "public", "uploads");

  try {
    // Read the contents of the image directory
    const files = fs.readdirSync(imageDirectory);

    // Delete each file within the directory
    files.forEach((file) => {
      const filePath = path.join(imageDirectory, file);
      fs.unlinkSync(filePath);
    });

    res.status(200).json({ message: "All images deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the images." });
  }
}
