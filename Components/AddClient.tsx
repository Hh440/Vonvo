import api from "@/utils/axiosInstance"
import { useState } from "react"


export default function AddClinet(){

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [company,setCompany] = useState("")
    const [phone,setPhone] = useState("")

    const handleClick = async()=>{
        const response = await api.post("/client",{
            name,
            email,
            company,
            phone

        })

        console.log(response)
    }
    return(
        <div className="flex justify-center items-center">
            <div>
                <label>Name</label>
                <input 
                  type="text" 
                  placeholder="Vikram"
                  onChange={(e)=>{
                    setName(e.target.value)
                  }} 
                />
            </div>

            <div>
                <label>Email</label>
                <input 
                  type="text" 
                  placeholder="Vikram124@gmail.com"
                  onChange={(e)=>{
                    setEmail(e.target.value)
                  }} 
                />
            </div>

            <div>

                <label>Company</label>
                <input 
                  type="text" 
                  placeholder="Vonvo"
                  onChange={(e)=>{
                    setCompany(e.target.value)
                  }} 
                />

            </div>

            <div>

                <label>Phone</label>
                <input 
                  type="text" 
                  placeholder="9834571038"
                  onChange={(e)=>{
                    setPhone(e.target.value)
                  }} 
                />
            </div>

            <button 
              className="w-20 h-10 border"
              onClick={()=>{
                handleClick()

              }}
            >
                Add Client
            </button>
        </div>
    )
}