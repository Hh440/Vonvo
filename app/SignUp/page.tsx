"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import api from "@/utils/axiosInstance";


export default function SignUp() {

    const [email, setEmail] = useState("");
    const [name,setName] =  useState("")
    const [role,setRole] = useState("")
    const [password,setPassword] = useState("")
    const route = useRouter()

    const handleSignUp = async() =>{

        console.log(email)
        console.log(password)
        console.log(name)
        console.log(role)

        const response = await api.post("/user",{
            email,
            password,
            name,
                    role
        })
        console.log(response)

        route.push("/ClientSection")
    }

    
  return (
    <div className="flex-col justify-center items-center   ">



        <div className="flex space-x-2"> 

            <label>Name</label>
           <input 
              type="name" 
              placeholder="Name" 
              onChange={(e)=>{setName(e.target.value)}}
            />

        </div>

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

            <label>Role</label>

            <select onChange={(e) => setRole(e.target.value)}>
            <option value="CLIENT">Client</option>
            <option value="ADMIN">Admin</option>
            </select>
        </div>

        <div>
            <button
            className="border-2 w-20 h-8"
            onClick={()=>{
                handleSignUp()
            }}
            
            >SignUp
            
            </button>
        </div>
      

        
      
    </div>
  );
}