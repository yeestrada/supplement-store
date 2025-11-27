import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Default product image placeholder - using a simple, reliable placeholder service
export const DEFAULT_PRODUCT_IMAGE = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&auto=format"

// Get product image or return default
export function getProductImage(image?: string | null): string {
  if (!image || image.trim() === "") {
    return DEFAULT_PRODUCT_IMAGE
  }
  // Ensure the image URL is properly formatted
  return image.trim()
}

