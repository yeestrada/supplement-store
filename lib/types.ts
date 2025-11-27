export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string | null
  isBestSeller: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: string
  shippingCity: string
  shippingZipCode: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  items: {
    product: Product
    quantity: number
  }[]
  total: number
}

