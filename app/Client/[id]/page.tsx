"use client"

import api from "@/utils/axiosInstance"
import { useParams } from "next/navigation"
import { useEffect,useState } from "react"

 const Client= ()=>{

    const id= useParams<{id:string}>()
    const [client, setClient] = useState("")


    const fetchClient = async () =>{
        const response= await api.get(`/client/${id}`)
        setClient(response.data)
        console.log(client)
    }

    useEffect(()=>{
        fetchClient
     


    },[])


    return(
        <div>

            {JSON.stringify(id)}

            {JSON.stringify(client)}

        </div>

    )


}



export default Client