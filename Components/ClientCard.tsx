import { User, Building2, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';   


export interface InvoiceProps{
  id: string;
  clientId: string;
  userId: string;
  issueDate: string;
  dueDate: string;
  status: "PAID" | "PENDING" | "OVERDUE"; // or whatever your InvoiceStatus enum is
  totalAmount: number;
  notes?: string;
  pdfUrl?: string;
  isRecurring?: boolean;
  createdAt: string;
};


export interface ClientProps{

    id:string,
    name:string,
    email:string,
    company:string,
    phone:string,
    createdAt:Date,
    className?:string
    
}

export default function ClinetCard({
    id,
    name,
    email,
    company,
    phone,
    createdAt,
    className=""

}:ClientProps)
{

    const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };


    const formatPhone = (phone: string | undefined | null): string => {
    if (!phone) return "";

    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }

    // Optionally format 11-digit numbers starting with '1'
    if (cleaned.length === 11 && cleaned.startsWith("1")) {
        return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }

    return phone; // fallback to original input
    };



  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

    return(

        
        <div className={`group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
      {/* Background gradient overlay on hover */}
      <Link href={`/Client/${id}`}>
      <div className="absolute  inset-0 bg-gradient-to-br from-blue-50/0 via-purple-50/0 to-pink-50/0 group-hover:from-blue-50/30 group-hover:via-purple-50/20 group-hover:to-pink-50/30 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
      
      {/* Content - Horizontal Layout */}
      <div className="relative z-10 flex items-center space-x-6">
        {/* Avatar Section */}
        <div className="flex-shrink-0">
          
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg ring-4 ring-white">
              <span className="text-white font-semibold text-lg">
                {getInitials(name)}
              </span>
            </div>
          
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            {/* Left Side - Name and Company */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
                {name}
              </h3>
              <div className="flex items-center space-x-2 mt-1 mb-4">
                <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <p className="text-gray-600 font-medium truncate">
                  {company}
                </p>
              </div>
            </div>

            {/* Right Side - Contact Information */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Email */}
              <div className="flex items-center space-x-2 group/item">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center group-hover/item:bg-blue-50 transition-colors duration-200">
                  <Mail className="w-4 h-4 text-gray-500 group-hover/item:text-blue-500 transition-colors duration-200" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</p>
                  <span
                   
                    className="text-sm text-gray-700 hover:text-blue-600 transition-colors duration-200 truncate block font-medium"
                  >
                    {email}
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-2 group/item">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center group-hover/item:bg-green-50 transition-colors duration-200">
                  <Phone className="w-4 h-4 text-gray-500 group-hover/item:text-green-500 transition-colors duration-200" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone</p>
                  <span 
                   
                    className="text-sm text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium"
                  >
                    {formatPhone(phone)}
                  </span>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center space-x-2 group/item">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center group-hover/item:bg-purple-50 transition-colors duration-200">
                  <Calendar className="w-4 h-4 text-gray-500 group-hover/item:text-purple-500 transition-colors duration-200" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Client Since</p>
                  <p className="text-sm text-gray-700 font-medium">
                    {formatDate(createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Link>
    </div>
    

    )
}