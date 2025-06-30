import { LineItem } from "@/app/api/client/[id]/route"
import api from "@/utils/axiosInstance"
import { useEffect, useState } from "react"

interface LineProps {
  id: string
}

const LineCard = ({ id }: LineProps) => {
  const [lineitem, setLineItem] = useState<LineItem[]>([])

  const fetchLineItem = async () => {
    
      const response = await api.get(`/client/LineItem/${id}`, {
        withCredentials: true
      })
      setLineItem(response.data)
    
  }

  useEffect(() => {
    fetchLineItem()
  }, [id])

  return (
    <div className="mt-6 bg-white border rounded-2xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Invoice Line Items</h2>
        <p className="text-sm text-gray-500">Invoice ID: {id}</p>
      </div>

      {lineitem.length === 0 ? (
        <div className="px-6 py-4 text-gray-500 text-sm">No line items found.</div>
      ) : (
        <div className="overflow-x-auto max-h-[400px]">
          <div className="min-w-full text-sm">
            {/* Header */}
            <div className="flex px-6 py-3 bg-gray-50 font-medium text-gray-600 border-b">
              <div className="w-[25%]">Description</div>
              <div className="w-[10%] text-center">Qty</div>
              <div className="w-[15%] text-center">Unit Price</div>
              <div className="w-[10%] text-center">Tax (%)</div>
              <div className="w-[10%] text-center">Discount (%)</div>
              <div className="w-[20%] text-right">Total</div>
            </div>

            {/* Rows */}
            {lineitem.map((item, index) => {
              const total =
                item.quantity *
                item.unitPrice *
                (1 + item.taxPercent / 100) *
                (1 - item.discount / 100)

              return (
                <div
                  key={index}
                  className="flex items-center px-6 py-3 border-b hover:bg-gray-50 transition"
                >
                  <div className="w-[25%] truncate text-gray-800">{item.description}</div>
                  <div className="w-[10%] text-center">{item.quantity}</div>
                  <div className="w-[15%] text-center">₹{item.unitPrice.toFixed(2)}</div>
                  <div className="w-[10%] text-center">{item.taxPercent}%</div>
                  <div className="w-[10%] text-center">{item.discount}%</div>
                  <div className="w-[20%] text-right font-medium text-gray-900">
                    ₹{total.toFixed(2)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default LineCard
