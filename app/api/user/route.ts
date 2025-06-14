import prisma from "@/db";



export async function POST(req:Request){

   
    const {email, password,name,role} = await req.json();

    try{

        // console.log(email)
        // console.log(password)
        // console.log(name)
        // console.log(role)

        if(!email || !password|| !name || !role){
            return new Response(JSON.stringify({ message: "All fields are required" }), {
        status: 400,
      });
        }

      const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
        role
      },
    });

    return new Response(JSON.stringify({ message: "User created", user }), {
      status: 201,
    });

    }catch(error){

        console.error(error)
       return new Response(JSON.stringify({ message: "Error creating user" }), {
      status: 500,
    });
    }
}



