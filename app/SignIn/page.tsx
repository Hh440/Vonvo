"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import api from "@/utils/axiosInstance"

export default function Login(){
    const [email,setEmail]= useState("")
    const [password,setPassword] = useState("")

    const router = useRouter()

    const handleSignIn = async()=>{
        
        const response = await api.post("/login",{
            email,
            password
        })

        console.log(response)

        router.push("/ClientSection")


    }

    return(
        <div>
            <div className="flex space-x-2"> 

            <label>Email</label>
           <input 
              type="email" 
              placeholder="Email" 
              onChange={(e)=>{setEmail(e.target.value)}}
            />

        </div>
        <div>

            <label>Password</label>
            <input 
               type="password" 
               placeholder="Password" 
               onChange={(e)=>{setPassword(e.target.value)}}
            />

        </div>

        <div>
             <button
            className="border-2 w-20 h-8"
            onClick={()=>{
                handleSignIn()
            }}
            
            >SignUp
            
            </button>
        </div>

        </div>
    )
}