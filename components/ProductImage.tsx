"use client"

import Image from "next/image"
import { useState } from "react"
import { getProductImage, DEFAULT_PRODUCT_IMAGE } from "@/lib/utils"

interface ProductImageProps {
  src?: string | null
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
}

export function ProductImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(getProductImage(src))

  const handleError = () => {
    setImgSrc(DEFAULT_PRODUCT_IMAGE)
  }

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={className}
        onError={handleError}
        unoptimized={imgSrc === DEFAULT_PRODUCT_IMAGE}
      />
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      unoptimized={imgSrc === DEFAULT_PRODUCT_IMAGE}
    />
  )
}

