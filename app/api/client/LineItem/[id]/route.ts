import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import prisma from "@/db"

const JWT_SECRET= process.env.JWT_SECRET!



export async function GET( request: Request,
  { params }: { params: { id: string } }) {

     const token = (await cookies()).get("token")?.value
        if(!token){
            return new Response("Unauthorized", {status: 401})
        }

    try{
        const decode:any = jwt.verify(token,JWT_SECRET)
        const userId= decode.userId

        const {id} = params
        const items = await prisma.lineItem.findMany({
            where:{
                invoiceId:id
            }
        })

        return new Response(JSON.stringify(items), {status: 200})
    }catch(error){
        console.log(error)

        return new Response(JSON.stringify({message:"Error whilw displayin the LineItems"}),{
            status:500
        })
    }
    
    
}