"use client";
export const toBase64 = (str: string): string =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const generateBlurDataURL = async (
  image: string,
  h: number,
  w: number,
  blurAmount: number
): Promise<string> => {
  const img = new Image();
  img.src = image;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");
  ctx!.filter = `blur(${blurAmount}px)`;
  ctx!.drawImage(img, 0, 0, w, h);

  return canvas.toDataURL();
};
