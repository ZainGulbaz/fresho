import Image from "next/image"
import { Pizza } from "@/assets"

type MenuCardProps={
    title:string;
    description:string,
    price:string|number
}

export default function MenuCard({title,description,price}:MenuCardProps){
    return(<>
    <div className="h-full w-full bg-gray-200 flex flex-col justify-center items-center rounded-md gap-2 px-1 py-2">
        <div className="h-20 sm:h-40 w-20 sm:w-40">
        <Image src={Pizza} alt={title}/>
        </div>

        <div>
           <h4 className="text-xl font-bold">{title}</h4>    
        </div>

        <p className="overflow-hidden text-sm w-4/5">
          {description}
        </p>  
         <button className="bg-primary px-4 py-2 rounded-xl text-white">
            Add to Cart {" "} {price}
         </button>
    </div>
    
    </>)
}