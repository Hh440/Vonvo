import prisma from "@/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"


const JWT_SECRET = process.env.JWT_SECRET!


export async function POST(req:Request){



    const token = (await cookies()).get("token")?.value;
    
    if(!token){
        return new Response("unauthorized",{status:401})
    }

    
    try{


        const decode:any  = jwt.verify(token,JWT_SECRET);
        const userId =  decode.userId

        const {name,email,company,phone} = await req.json();

        console.log(userId)

        console.log(name)
        console.log(email)
        console.log(company)
        console.log(phone)
        const client =  await prisma.client.create({
        data:{
            name,
            email,
            company,
            phone,
            userId
        }
    })

    console.log(client)

    return new Response(JSON.stringify({message:"client created"}),{
        status:201
    })

    }catch(error){
        console.error(error)
        return new Response(JSON.stringify({message:"Error while creating the client"}),{
            status:500
        })
    }
    


    
}


export async function GET(){

    const token = (await cookies()).get("token")?.value;

    if(!token){
        return new Response(JSON.stringify({message:"You are not logged in"}),{
            status:500
        })
    }


    try{
        const decode :any =  jwt.verify(token,JWT_SECRET)
        const userId = decode.userId

        const client = await prisma.client.findMany({
            where:{
                userId
            }
        })

        console.log(client)


        return new Response(JSON.stringify(client),{
            status:201
        })
        
        
    }catch(error){
        console.error(error);
        return new Response(JSON.stringify({message:"Error while getting the clients"}),{
            status:500
        })
    }
}    



