import { ClientProps } from "./ClientCard"
import { Building2, Mail, Phone, User, FileText, Edit } from 'lucide-react';

const ClientDisplayCard= ({
    id,
    name,
    email,
    company,
    phone,
    createdAt,
    className=""

}:ClientProps)=>{


    const onAddInvoice= async()=>{

     alert("hello invoce call")
    }
    return (
         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
            {name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{name}</h2>
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 size={16} />
              <span className="font-medium">{company}</span>
            </div>
          </div>
        </div>
        
        <button
          //onClick={() => onEditClient(client.id)}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          title="Edit Client"
        >
          <Edit size={18} />
        </button>
      </div>

      {/* Contact Information */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 text-gray-700">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Phone size={16} className="text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Phone</p>
            <p className="font-semibold">{phone}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-gray-700">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Mail size={16} className="text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Email</p>
            <p className="font-semibold">{email}</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
         onClick={() => onAddInvoice()}
        className="w-90  bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
      >
        <FileText size={20} />
        Create Invoice
      </button>
    </div>
    )
}

export default ClientDisplayCard