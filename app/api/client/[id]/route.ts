import { cookies } from "next/headers";
import  jwt  from "jsonwebtoken";
import prisma from "@/db";

const JWT_SECRET= process.env.JWT_SECRET!



export async function GET( { params }: { params: { id: string } }){
    const id= params.id
    console.log(id)
    const token = (await cookies()).get("token")?.value
    if(!token){
        return new Response("Unauthorized", {status: 401})
    }

    try{

        const decode:any=  jwt.verify(token,JWT_SECRET)

        const userId= decode.userId

        const client =  await prisma.client.findFirst({
            where:{
                id,
                userId,
            }
        })

        console.log(client)

         if (!client) {
       return new Response("Client not found", { status: 404 });
       }

        return new Response(JSON.stringify(client),{
            status:201
        })

    }catch(error){
        console.error(error)
        return new Response(JSON.stringify({message:"Error while fetching"}),{
            status: 500,
        })
    }
}