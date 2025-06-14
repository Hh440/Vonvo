
import prisma from "@/db"

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

        console.log(user)

        return new Response(JSON.stringify({message:"User found"}),{
            status:201
        })

        

    }catch(error){
        console.error(error)
        return new Response(JSON.stringify({message:"Error"}),{
            status:500
        })


    }
    
}