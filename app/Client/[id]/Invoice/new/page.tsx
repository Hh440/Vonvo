"use client";

import { useState } from "react";
import api from "@/utils/axiosInstance";
import { useParams } from "next/navigation";

type LineItem = {
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  discount: number;
};

const InvoiceNew = () => {

     const params = useParams();
     const id = Array.isArray(params.id) ? params.id[0] : params.id;
     

  const [dueDate, setDueDate] = useState(new Date());
  const [notes, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { description: "", quantity: 1, unitPrice: 0, tax: 0, discount: 0 },
  ]);
  


    const calculateItemTotal = (item: LineItem) => {
    const subtotal = item.quantity * item.unitPrice;
    const taxAmount = (subtotal * item.tax) / 100;
    const discountAmount = (subtotal * item.discount) / 100;
    return subtotal + taxAmount - discountAmount;
    };

    const calculateInvoiceTotal = () => {
    return lineItems.reduce((acc, item) => acc + calculateItemTotal(item), 0);
    };

  const handleItemChange = (
    index: number,
    field: keyof LineItem,
    value: string
  ) => {
    const updated = [...lineItems];
    if (field === "description") {
      updated[index][field] = value;
    } else {
      updated[index][field] = Number(value);
    }
    setLineItems(updated);
  };

  const addItem = () => {
    setLineItems([
      ...lineItems,
      { description: "", quantity: 1, unitPrice: 0, tax: 0, discount: 0 },
    ]);
  };

  const removeItem = (index: number) => {
    const updated = [...lineItems];
    updated.splice(index, 1);
    setLineItems(updated);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const totalAmount = calculateInvoiceTotal()

    
     const response = await api.post(`/client/${id}`, {
     clientId:id, // coming from /clients/:id/invoices/new
      dueDate,
      status,
      notes,
      lineItems,
      totalAmount
  }, {
    withCredentials: true
  });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 bg-white rounded-xl shadow-lg space-y-12">
      <h1 className="text-4xl font-bold text-gray-900">🧾 New Invoice</h1>

      {/* Invoice Meta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            onChange={(e) => setDueDate(new Date(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Status</option>
            <option value="DRAFT">Draft</option>
            <option value="SENT">Sent</option>
            <option value="PAID">Paid</option>
            <option value="OVERDUE">Overdue</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
          <textarea
            value={notes}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any additional information for the client..."
          />
        </div>
      </div>

      {/* Line Items */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Line Items</h2>
          <button
            type="button"
            onClick={addItem}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Item
          </button>
        </div>

        <div className="space-y-6">
          {lineItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm relative"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="e.g., Website Redesign"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qty</label>
                  <input
                    type="number"
                    placeholder="1"
                    //value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price</label>
                  <input
                    type="number"
                    //value={item.unitPrice}
                    placeholder="1"
                    onChange={(e) =>
                      handleItemChange(index, "unitPrice", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 md:col-span-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax %</label>
                    <input
                      type="number"
                      //value={item.tax}
                      placeholder="0"
                      onChange={(e) =>
                        handleItemChange(index, "tax", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
                    <input
                      type="number"
                      //value={item.discount}
                      placeholder="0"
                      onChange={(e) =>
                        handleItemChange(index, "discount", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              {lineItems.length > 1 && (
                <button
                  onClick={() => removeItem(index)}
                  className="absolute top-3 right-3 text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Total Amount */}
        <div className="flex justify-end text-xl font-semibold text-gray-800">
        Total Amount: ₹ {calculateInvoiceTotal().toFixed(2)}
        </div>


      {/* Submit */}
      <div className="pt-6 border-t">
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
        >
          ✅ Create Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoiceNew;
