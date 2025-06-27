"use client"

import ClientDisplayCard from "@/Components/ClientDispalyCard"
import api from "@/utils/axiosInstance"
import { useParams } from "next/navigation"
import { useEffect,useState } from "react"
import { ClientProps } from "@/Components/ClientCard"
import ClientInvoiceDisplay from "@/Components/ClientInvoiceDisplay"
import { InvoiceProps } from "@/Components/ClientCard"

export interface ClientInvoiceDisplayProps {
  id: string;
  invoice: InvoiceProps[];
};


 const Client= ()=>{

    const ClientId= useParams<{id:string}>()

    const id = ClientId.id
    const [client, setClient] = useState<ClientProps|null>(null)
    const [clientInvoice,SetClientInvoice]= useState<ClientInvoiceDisplayProps|null>(null)


    const fetchClient = async () =>{
        console.log("hey there")
        const response= await api.get(`/client/${id}`)
    
        setClient(response.data)
        SetClientInvoice({
            id:response.data.id,
            invoice:response.data.invoice
        })
        
    }

    useEffect(()=>{
        fetchClient()
     


    },[])


    if (!client||!clientInvoice) return <div>Loading...</div>;


    return(
        <div>
            <div>
               <ClientDisplayCard
                    id={client.id}
                    name={client.name}
                    email={client.email}
                    company={client.company}
                    phone={client.phone}
                    createdAt={new Date(client.createdAt)}     
                />
            </div>

            {/* {JSON.stringify(clientInvoice)} */}

            
            <div>
                <ClientInvoiceDisplay
                id={client.id}
                invoice={clientInvoice.invoice}
                />
            </div>
            

        </div>

    )


}



export default Client