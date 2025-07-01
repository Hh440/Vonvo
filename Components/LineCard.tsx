"use client"

import { LineItem } from "@/app/api/client/[id]/route"
import api from "@/utils/axiosInstance"
import { useEffect, useState, useMemo } from "react"
import { Receipt, Package, Percent, Minus } from "lucide-react"

interface LineProps {
  id: string
}

const LineCard = ({ id }: LineProps) => {
  const [lineitem, setLineItem] = useState<LineItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLineItem = async () => {
    try {
      const response = await api.get(`/client/LineItem/${id}`, {
        withCredentials: true,
      })
      setLineItem(response.data)
      setError(null)
    } catch (err) {
      console.error("Error fetching line items:", err)
      setError("Failed to fetch line items.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchLineItem()
  }, [id])

  const calculateTotal = () => {
    return lineitem.reduce((sum, item) => {
      const quantity = item.quantity ?? 0
      const unitPrice = item.unitPrice ?? 0
      const tax = item.taxPercent ?? 0
      const discount = item.discount ?? 0

      const itemTotal =
        quantity * unitPrice * (1 + tax / 100) * (1 - discount / 100)
      return sum + itemTotal
    }, 0)
  }

  const totalAmount = useMemo(() => calculateTotal(), [lineitem])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-xl">
              <Receipt className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Invoice Line Items</h2>
          </div>
          <div className="flex items-center gap-2 text-blue-100">
            <span className="text-sm font-medium">Invoice ID:</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-mono font-semibold">
              {id}
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="px-8 py-16 text-center text-gray-500 text-sm">
            Loading line items...
          </div>
        ) : error ? (
          <div className="px-8 py-16 text-center text-red-500 font-medium">
            {error}
          </div>
        ) : lineitem.length === 0 ? (
          <div className="px-8 py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No line items found</h3>
            <p className="text-gray-500">This invoice doesn't contain any line items yet.</p>
          </div>
        ) : (
          <>
            {/* Table Container */}
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Table Header */}
                <div className="bg-gray-50 border-b border-gray-200">
                  <div className="grid grid-cols-12 gap-4 px-8 py-4 text-sm font-semibold text-gray-700">
                    <div className="col-span-4 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Description
                    </div>
                    <div className="col-span-1 text-center">Qty</div>
                    <div className="col-span-2 text-center">Unit Price</div>
                    <div className="col-span-1 text-center flex justify-center items-center gap-1">
                      <Percent className="w-3 h-3" />
                      Tax
                    </div>
                    <div className="col-span-1 text-center flex justify-center items-center gap-1">
                      <Minus className="w-3 h-3" />
                      Disc.
                    </div>
                    <div className="col-span-3 text-right">Total Amount</div>
                  </div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-gray-100">
                  {lineitem.map((item, index) => {
                    const quantity = item.quantity ?? 0
                    const unitPrice = item.unitPrice ?? 0
                    const tax = item.taxPercent ?? 0
                    const discount = item.discount ?? 0

                    const itemTotal =
                      quantity * unitPrice * (1 + tax / 100) * (1 - discount / 100)

                    return (
                      <div
                        key={index}
                        className="grid grid-cols-12 gap-4 px-8 py-6 hover:bg-blue-50/50 transition-all duration-200 group"
                      >
                        <div className="col-span-4">
                          <div className="font-medium text-gray-900 mb-1">
                            {item.description}
                          </div>
                          <div className="text-xs text-gray-500">Item #{index + 1}</div>
                        </div>

                        <div className="col-span-1 text-center">
                          <div className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-xl font-semibold text-gray-700 group-hover:bg-blue-100 transition-colors">
                            {quantity}
                          </div>
                        </div>

                        <div className="col-span-2 text-center font-semibold text-gray-900">
                          {formatCurrency(unitPrice)}
                        </div>

                        <div className="col-span-1 text-center">
                          <span className="inline-flex px-2 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                            {tax}%
                          </span>
                        </div>

                        <div className="col-span-1 text-center">
                          {discount > 0 ? (
                            <span className="inline-flex px-2 py-1 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium">
                              {discount}%
                            </span>
                          ) : (
                            <div className="text-gray-400 text-sm">—</div>
                          )}
                        </div>

                        <div className="col-span-3 text-right">
                          <div className="text-xl font-bold text-gray-900">
                            {formatCurrency(itemTotal)}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Summary Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
              <div className="px-8 py-6">
                <div className="flex justify-between items-center">
                  <div className="text-gray-600 text-sm font-medium">
                    Total Items: <span className="font-bold text-gray-900">{lineitem.length}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">Invoice Total</div>
                    <div className="text-3xl font-bold text-blue-600">
                      {formatCurrency(totalAmount)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default LineCard
