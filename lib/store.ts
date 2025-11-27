"use client"

import { create } from "zustand"
import { CartItem, Order } from "./types"

interface CartStore {
  items: CartItem[]
  addItem: (product: CartItem["product"]) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

interface OrderStore {
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product) => {
    const items = get().items
    if (items.find((item) => item.product.id === product.id)) {
      return
    }
    set({ items: [...items, { product, quantity: 1 }] })
  },
  removeItem: (productId) => {
    set({ items: get().items.filter((item) => item.product.id !== productId) })
  },
  clearCart: () => set({ items: [] }),
  getTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  },
  getItemCount: () => {
    return get().items.length
  },
}))

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  addOrder: (order) => {
    set({ orders: [...get().orders, order] })
  },
  updateOrderStatus: (orderId, status) => {
    set({
      orders: get().orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      ),
    })
  },
}))

