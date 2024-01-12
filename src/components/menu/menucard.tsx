import Image from "next/image"
import { Pizza } from "@/assets"
import ProductDetails from "./details/productdetails"
import { useState } from "react";
import { TProduct } from "@/app/dashboard/products/products";

type MenuCardProps={
  
    data:TProduct
}

export default function MenuCard({data}:MenuCardProps){

    const [isOpen,setIsOpen]=useState<boolean>(false);

    const toggleModal=()=>setIsOpen(!isOpen);

    return(<>
    <div className="h-full w-full bg-gray-200 flex flex-col justify-center items-center rounded-md gap-2 px-1 py-2">
        <div className="h-20 sm:h-60 w-20 sm:w-60">
       {(data?.image) && <img src={data?.image} alt={data?.name} className="w-full h-full object-cover rounded-lg"/>}
        </div>

        <div>
           <h4 className="text-xl font-bold">{data?.name}</h4>    
        </div>

        <p className="overflow-hidden text-sm w-4/5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus blanditiis illum quibusdam dolores earum eum ipsum ex reiciendis! Atque, placeat quos, quam cum possimus fuga earum vel, culpa dolor explicabo corrupti officiis.
        </p>  
         <button className="bg-primary px-4 py-2 rounded-xl text-white"
         onClick={toggleModal}
         >
            Add to Cart {" "} {data?.small?.price}
         </button>

         <ProductDetails isOpen={isOpen} setIsOpen={setIsOpen} toggleModal={toggleModal} data={data}/>
    </div>
    
    </>)
}