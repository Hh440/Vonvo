// login route => login/route.ts


import prisma from "@/db"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";



const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req:Request) {

    try{

        const{email,password}=  await req.json()

        if(!email || !password){
            return new Response(JSON.stringify({message:"All fields required"}),{
                status:400
            })
        }


        const user = await prisma.user.findUnique({
            where:{
                email,
                password
            }
        })

        if(!user){
            return new Response(JSON.stringify({message:"Invalid credentials"}),{
                status:404
            })
        }

        const token = jwt.sign({
            userId:user.id,role:user.role
        },
        JWT_SECRET,
        {expiresIn:"20d"}
      )

        console.log(user)

        const res = NextResponse.json({ message: "Login successful" });

        res.cookies.set("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV ==="production",
            maxAge:60 * 60 * 24 * 7,
            sameSite:"lax",
            path:"/"
        })

        console.log(res)


        return res;
        

        

    }catch(error){
        console.error(error)
        return new Response(JSON.stringify({message:"Error"}),{
            status:500
        })


    }
    
}