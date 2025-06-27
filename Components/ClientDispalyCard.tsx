import { ClientProps } from "./ClientCard";
import { Building2, Mail, Phone, FileText, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

const ClientDisplayCard = ({
  id,
  name,
  email,
  company,
  phone,
  createdAt,
  className = "",
}: ClientProps) => {
  const router = useRouter();

  const onAddInvoice = () => {
    router.push(`/Client/${id}/Invoice/new`);
  };

  return (
    <div
      className={`relative backdrop-blur-xl bg-white/70 border border-gray-200 shadow-xl rounded-3xl p-6 sm:p-8 transition-transform  ${className}`}
    >
      {/* Background overlay circle */}
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-200 rounded-full opacity-30 z-0" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-xl shadow-lg ring-4 ring-white">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">
              {name}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-gray-500">
              <Building2 size={16} />
              <span className="text-sm font-medium">{company}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 text-sm text-gray-800">
        <div className="flex items-start gap-3">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Phone className="text-blue-600 w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
              Phone
            </p>
            <p className="font-medium">{phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-green-50 p-2 rounded-lg">
            <Mail className="text-green-600 w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
              Email
            </p>
            <p className="font-medium break-words">{email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-purple-50 p-2 rounded-lg">
            <Calendar className="text-purple-600 w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
              Joined On
            </p>
            <p className="font-medium">
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onAddInvoice}
        className="w-50 bg-gradient-to-r  from-blue-600 to-blue-800  text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-90 active:scale-50 shadow-md"
      >
        <FileText size={20} />
        Create Invoice
      </button>
    </div>
  );
};

export default ClientDisplayCard;
