"use client"
import AddClinet from "@/Components/AddClient";
import ClientDisplay from "@/Components/ClientDisplay";


export default  function CreateClient() {
    return(
        <div>
           <div>
               <AddClinet/>
           </div>


           <div>
               <ClientDisplay/>
           </div>
        </div>
    )

}