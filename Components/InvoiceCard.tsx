import React from 'react';
import {
  Calendar,
  DollarSign,
  FileText,
  Clock,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  XCircle,
  Send,
  ArrowRight
} from 'lucide-react';
import { InvoiceProps } from './ClientCard';

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';

interface InvoiceCardProps {
  invoice: InvoiceProps;
  onStatusChange?: (invoiceId: string, status: InvoiceStatus) => void;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice, onStatusChange }) => {
  const getStatusConfig = (status: InvoiceStatus) => {
    switch (status) {
      case 'PAID':
        return {
          color: 'bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 border-emerald-200 shadow-emerald-100/50',
          icon: CheckCircle,
          label: 'Paid',
          dotColor: 'bg-emerald-500'
        };
      case 'SENT':
        return {
          color: 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200 shadow-blue-100/50',
          icon: Send,
          label: 'Sent',
          dotColor: 'bg-blue-500'
        };
      case 'OVERDUE':
        return {
          color: 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200 shadow-red-100/50',
          icon: AlertCircle,
          label: 'Overdue',
          dotColor: 'bg-red-500'
        };
      case 'CANCELLED':
        return {
          color: 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200 shadow-gray-100/50',
          icon: XCircle,
          label: 'Cancelled',
          dotColor: 'bg-gray-500'
        };
      default:
        return {
          color: 'bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 border-amber-200 shadow-amber-100/50',
          icon: FileText,
          label: 'Draft',
          dotColor: 'bg-amber-500'
        };
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };

  const normalizedStatus = invoice.status.toUpperCase() as InvoiceStatus;
  const isOverdue = normalizedStatus !== 'PAID' && new Date() > new Date(invoice.dueDate);
  const statusConfig = getStatusConfig(isOverdue ? 'OVERDUE' : normalizedStatus);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="group bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 overflow-hidden backdrop-blur-sm">
      <div className={`h-1 ${statusConfig.dotColor} opacity-60`}></div>
      <div className="flex items-center p-8">
        <div className="flex-1 min-w-0 pr-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center border border-slate-200/50">
                  <FileText className="w-6 h-6 text-slate-600" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusConfig.dotColor} rounded-full border-2 border-white shadow-sm`}></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                  #{invoice.id}
                </h3>
                <p className="text-sm font-medium text-gray-600">Client ID: {invoice.clientId}</p>
              </div>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border shadow-sm ${statusConfig.color}`}>
              <StatusIcon className="w-4 h-4" />
              {statusConfig.label}
            </div>
          </div>

          {invoice.notes && (
            <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
                {invoice.notes}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-12 px-8 border-l border-r border-gray-100">
          <div className="text-center">
            <div className="relative mb-3">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200/50 shadow-sm">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Issued</p>
            <p className="text-sm font-bold text-gray-900">{formatDate(invoice.issueDate)}</p>
          </div>
          <div className="flex items-center">
            <ArrowRight className="w-5 h-5 text-gray-300" />
          </div>
          <div className="text-center">
            <div className="relative mb-3">
              <div className={`flex items-center justify-center w-14 h-14 rounded-2xl border shadow-sm ${
                isOverdue ? 'bg-gradient-to-br from-red-50 to-red-100 border-red-200/50' : 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200/50'
              }`}>
                <Clock className={`w-6 h-6 ${isOverdue ? 'text-red-600' : 'text-orange-600'}`} />
              </div>
              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                isOverdue ? 'bg-red-500' : 'bg-orange-500'
              }`}></div>
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Due</p>
            <p className={`text-sm font-bold ${isOverdue ? 'text-red-700' : 'text-gray-900'}`}>{formatDate(invoice.dueDate)}</p>
          </div>
        </div>

        <div className="flex items-center gap-8 pl-8">
          <div className="text-right">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center border border-green-200/50">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Amount</p>
                <span className="text-2xl font-bold text-gray-900">
                  {formatCurrency(invoice.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-[140px]">
            {normalizedStatus === 'DRAFT' && (
              <button
                onClick={() => onStatusChange?.(invoice.id, 'SENT')}
                className="group/btn px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 text-sm shadow-sm hover:shadow-md hover:shadow-blue-200/50"
              >
                <span className="flex items-center justify-center gap-2">
                  <Send className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                  Send
                </span>
              </button>
            )}
            {normalizedStatus === 'SENT' && (
              <button
                onClick={() => onStatusChange?.(invoice.id, 'PAID')}
                className="group/btn px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-semibold transition-all duration-200 text-sm shadow-sm hover:shadow-md hover:shadow-emerald-200/50"
              >
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                  Mark Paid
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCard;
