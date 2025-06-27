import { ClientInvoiceDisplayProps } from "@/app/Client/[id]/page";
import { BadgeCheck, AlertCircle, Clock } from "lucide-react";

const statusIcon = {
  PAID: <BadgeCheck className="text-green-600" size={18} />,
  PENDING: <Clock className="text-yellow-500" size={18} />,
  OVERDUE: <AlertCircle className="text-red-600" size={18} />,
};

const statusColor = {
  PAID: "bg-green-100 text-green-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  OVERDUE: "bg-red-100 text-red-800",
};

const ClientInvoiceDisplay = ({ id, invoice }: ClientInvoiceDisplayProps) => {
  return (
    <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Invoices</h2>

      {invoice.length === 0 ? (
        <div className="text-gray-500 text-sm">No invoices yet.</div>
      ) : (
        <div className="grid gap-5">
          {invoice.map((inv) => (
            <div
              key={inv.id}
              className="rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  {statusIcon[inv.status]}
                  <span
                    className={`text-sm font-medium px-2 py-0.5 rounded-md ${statusColor[inv.status]}`}
                  >
                    {inv.status}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  Issued: {new Date(inv.issueDate).toLocaleDateString()}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">
                <div>
                  <span className="block text-gray-500">Amount</span>
                  ₹{inv.totalAmount.toFixed(2)}
                </div>
                <div>
                  <span className="block text-gray-500">Due Date</span>
                  {new Date(inv.dueDate).toLocaleDateString()}
                </div>
                <div>
                  <span className="block text-gray-500">Recurring</span>
                  {inv.isRecurring ? "Yes" : "No"}
                </div>
                {inv.notes && (
                  <div className="col-span-full">
                    <span className="block text-gray-500">Notes</span>
                    <p className="text-gray-600">{inv.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientInvoiceDisplay;
