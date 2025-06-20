"use client"

import { useParams } from "next/navigation"

 const Client= ()=>{

    const id= useParams<{id:string}>()


    return(
        <div>

            {JSON.stringify(id)}

        </div>

    )


}



export default Client