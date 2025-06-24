"use client"

import ClientDisplayCard from "@/Components/ClientDispalyCard"
import api from "@/utils/axiosInstance"
import { useParams } from "next/navigation"
import { useEffect,useState } from "react"
import { ClientProps } from "@/Components/ClientCard"

 const Client= ()=>{

    const ClientId= useParams<{id:string}>()

    const id = ClientId.id
    const [client, setClient] = useState<ClientProps|null>(null)


    const fetchClient = async () =>{
        console.log("hey there")
        const response= await api.get(`/client/${id}`)
        setClient(response.data)
    }

    useEffect(()=>{
        fetchClient()
     


    },[])


    if (!client) return <div>Loading...</div>;


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

        </div>

    )


}



export default Client