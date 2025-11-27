"use client"

import { useState, useMemo } from "react"
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
    <main className="flex-1 container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">All Orders</h1>
          <p className="text-muted-foreground">Manage and track all customer orders</p>
        </div>

        <Card className="mb-8 shadow-md">
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
                  className="h-11"
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="h-11">
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
                  className="h-11"
                />
                <Input
                  type="date"
                  placeholder="To"
                  value={dateTo}
                  onChange={(e) => {
                    setDateTo(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="h-11"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">ID</TableHead>
                    <TableHead className="font-semibold">Customer</TableHead>
                    <TableHead className="font-semibold">Products</TableHead>
                    <TableHead className="font-semibold">Total</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12">
                        <p className="text-muted-foreground">No orders found</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium font-mono text-sm">{order.id}</TableCell>
                        <TableCell className="font-medium">{order.customerName}</TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {order.items.length} product(s)
                          </span>
                        </TableCell>
                        <TableCell className="font-semibold text-primary">
                          ${order.total.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString("en-US")}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${getStatusColor(order.status)}`}
                          >
                            {getStatusLabel(order.status)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Link href={`/provider/orders/${order.id}`}>
                            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-all">
                              View Details
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Previous
            </Button>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
              <span className="text-sm font-medium">
                Page <span className="font-bold text-primary">{currentPage}</span> of {totalPages}
              </span>
            </div>
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className="hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Next
            </Button>
          </div>
        )}
      </main>
  )
}

