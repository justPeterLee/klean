"use client";

import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt: string | "";
  styling: {
    height: number;
    width: number;
  };
}

function ProductImage(props: ProductImageProps) {
  const { src, alt, styling } = props;
  return (
    <Image src={src} alt={alt} height={styling.height} width={styling.width} />
  );
}
