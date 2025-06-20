"use client"

import api from "@/utils/axiosInstance"
import { useEffect, useState } from "react"
import ClinetCard, { ClientProps } from "./ClientCard"


export default function ClientDisplay(){

    const [clients,setClient]=  useState<ClientProps[]>([])

    const displayClient= async()=>{

        const response = await api.get("/client")

        console.log(response)

         setClient(response.data)
    }


    useEffect(()=>{
        displayClient()
    },[])
    return(
        <div className="p-4 text-white">
      <h1 className="text-xl font-bold mb-2">Client Info</h1>
      <pre className="bg-gray-800 p-4 rounded-lg">
         <div className="space-y-4">
            {
                clients.map((client, index) =>   (

                    <ClinetCard
                    key={client.id}
                    id={client.id}
                    name={client.name}
                    email={client.email}
                    company={client.company}
                    phone={client.phone}
                    createdAt={new Date(client.createdAt)}
                    
                    />



                ))
            }
            
         </div>
      </pre>
    </div>
    )
}