"use client";

import { ClientInvoiceDisplayProps } from "@/app/Client/[id]/page";
import InvoiceCard from "@/Components/InvoiceCard";

const ClientInvoiceDisplay = ({ id, invoice }: ClientInvoiceDisplayProps) => {
  return (
    <div className="mt-10 bg-white border border-blue-100 rounded-3xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Invoices</h2>

      {invoice.length === 0 ? (
        <div className="text-gray-500 text-sm">No invoices yet.</div>
      ) : (
        <div className="flex flex-col gap-6">
          {invoice.map((inv) => (
            <InvoiceCard key={inv.id} invoice={inv} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientInvoiceDisplay;
