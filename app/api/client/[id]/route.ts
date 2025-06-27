// route folder => /api/client/[id]/route.ts



import { cookies } from "next/headers";
import  jwt  from "jsonwebtoken";
import prisma from "@/db";
import { NextRequest } from "next/server";

const JWT_SECRET= process.env.JWT_SECRET!

type LineItem = {
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;      // becomes taxPercent in DB
  discount: number;
}




export async function GET( req: NextRequest, context: { params: { id: string } }){
    const token = (await cookies()).get("token")?.value
    if(!token){
        return new Response("Unauthorized", {status: 401})
    }

    try{

        const {id} = context.params
           //const displayId= params.id
        console.log(id)

        const decode:any=  jwt.verify(token,JWT_SECRET)

        const userId= decode.userId

        const client =  await prisma.client.findUnique({
            where:{
                id:id,
                userId                  
            },select:{
                id:true,
                name:true,
                email:true,
                company:true,
                phone:true,
                createdAt:true,
                userId:true,
                invoice:true
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


export async function POST(req:Request){

    const token = (await cookies()).get("token")?.value
    if(!token){
        return new Response("Unauthorized", {status: 401})
    }


    try{

        const {clientId,dueDate,status,notes,totalAmount,lineItems}= await req.json()



        const decode:any= jwt.verify(token,JWT_SECRET)
        const userId = decode.userId

        const invoice= await prisma.invoice.create({
            data: {
            clientId,
            userId,
            dueDate:new Date(dueDate),
            status,
            totalAmount,
            notes,
            lineItems: {
            create: lineItems.map((item :LineItem)=> ({
                description: item.description,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                taxPercent: item.tax,
                discount: item.discount
            }))
            }
        },
        include: { lineItems: true }
                })


        console.log(invoice)

        return Response.json(invoice, { status: 201 });
    }catch (error) {
    console.error("Error creating invoice:", error);
    return new Response("Something went wrong", { status: 500 });
  }


}