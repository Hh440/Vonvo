"use client"

import api from "@/utils/axiosInstance"
import { useParams } from "next/navigation"
import { useEffect,useState } from "react"

 const Client= ()=>{

    const ClientId= useParams<{id:string}>()

    const id = ClientId.id
    const [client, setClient] = useState("")


    const fetchClient = async () =>{
        console.log("hey there")
        const response= await api.get(`/client/${id}`)
        setClient(response.data)
        
        console.log(client)
    }

    useEffect(()=>{
        fetchClient()
     


    },[])


    return(
        <div>

           

         <div>{id}</div>

            {JSON.stringify(client)}

        </div>

    )


}



export default Client