"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useOrderStore } from "@/lib/store"
import { dummyOrders } from "@/lib/data"
import { Order } from "@/lib/types"
import Link from "next/link"
import { useEffect } from "react"

const ITEMS_PER_PAGE = 5

export default function OrdersPage() {
  const orders = useOrderStore((state) => state.orders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (orders.length === 0) {
      dummyOrders.forEach((order) => {
        useOrderStore.getState().addOrder(order)
      })
    }
  }, [orders.length])

  const allOrders = useMemo(() => {
    const storeOrders = useOrderStore.getState().orders
    const combined = [...storeOrders, ...dummyOrders]
    const unique = combined.filter((order: Order, index: number, self: Order[]) =>
      index === self.findIndex((o: Order) => o.id === order.id)
    )
    return unique
  }, [orders])

  const filteredOrders = useMemo(() => {
    let filtered = [...allOrders]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (order: Order) =>
          order.id.toLowerCase().includes(query) ||
          order.customerName.toLowerCase().includes(query) ||
          order.items.some((item) =>
            item.product.name.toLowerCase().includes(query)
          )
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order: Order) => order.status === statusFilter)
    }

    if (dateFrom) {
      filtered = filtered.filter(
        (order: Order) => new Date(order.createdAt) >= new Date(dateFrom)
      )
    }

    if (dateTo) {
      filtered = filtered.filter(
        (order: Order) => new Date(order.createdAt) <= new Date(dateTo)
      )
    }

    return filtered
  }, [searchQuery, statusFilter, dateFrom, dateTo, allOrders])

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    }
    return colors[status]
  }

  const getStatusLabel = (status: Order["status"]) => {
    const labels = {
      pending: "Pending",
      processing: "Processing",
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled",
    }
    return labels[status]
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <h1 className="mb-8 text-4xl font-bold">All Orders</h1>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search by ID, customer or product..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Input
                  type="date"
                  placeholder="From"
                  value={dateFrom}
                  onChange={(e) => {
                    setDateFrom(e.target.value)
                    setCurrentPage(1)
                  }}
                />
                <Input
                  type="date"
                  placeholder="To"
                  value={dateTo}
                  onChange={(e) => {
                    setDateTo(e.target.value)
                    setCurrentPage(1)
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>
                        {order.items.length} product(s)
                      </TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString("en-US")}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Link href={`/provider/orders/${order.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

