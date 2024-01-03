"use client";

import Image from "next/image"
import { Sallad1 } from "@/assets"
import { Sallad2 } from "@/assets"
import MenuCard from "./menucard"
import SectionName from "../commons/sectionname"
import { useCookies } from "react-cookie"
import { getProducts } from "@/app/dashboard/products/api"
import { useEffect, useState } from "react"
import CookiesHandler, { TCookies } from "@/utils/cookieshandler"
import toast,{ Toaster } from "react-hot-toast"
import { TProduct } from "@/app/dashboard/products/products"
import Sekeleton from "../commons/skeleton"
import LoadMore from "../commons/loadmore";

export default function Menu(){

    const inc=6;

    const [products,setProducts]:[products:TProduct[],setProducts:Function]=useState([]);
    
    const [start,setStart]=useState(0);
    const [end,setEnd]=useState(6);
    const [prevValues,setPrevValues]=useState({start,end}); 

    const [allProductsFetched,setAllProductsFetched]=useState(false);
    const sekeletons=[1,2,3,4,5,6];
    const [cookies,setCookie]=useCookies(["fresho"]);

    const [isLoading,setIsLoading]=useState(false);

    useEffect(()=>{
        handleGetProducts();
          
    },[]);

    useEffect(()=>{
        
        if(prevValues.start!==start && prevValues.end!==end){
            setIsLoading(true);
            handleGetProducts().finally(()=>setIsLoading(false));
        }

    },[start,end]);

    const handleGetProducts=async()=>{
        try{
            let cookiesHandler= new CookiesHandler(cookies?.fresho as TCookies);
            const token= cookiesHandler.getToken() || "";
            const response= await getProducts(token,{start:start.toString(),end:end.toString()});

            if(response.statusCode==200){
                const newProducts=response?.data?.products;
                if(newProducts?.length<inc) setAllProductsFetched(true);
                setProducts(([...products,...newProducts])) ;
            }
            else throw new Error(response?.message?.[0]);
        }
        catch(err:any)
        {
            toast.error(err.message);
        }

    }



    return (
        <section className="mt-16 w-full">
            <Toaster/>
            <div className="flex justify-between">
                <Image src={Sallad1} alt="salad1" className="-top-32 relative -z-10 rounded-full"/>
                <SectionName subText="checkout" mainText="Menu"/>
                <Image className="-top-52 -right-4 rounded-full -z-10 relative" src={Sallad2} alt="salad1"/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
               {
                products?.map((product)=><MenuCard title={product?.name} description="This is the best pizza in the world, very tasty and wonderful wow just elegant" price={"$12"} key={product._id} />)
               }
               {
                (products.length==0)&& sekeletons?.map(sekeleton=><Sekeleton/>)
               }
            </div>
            {(products.length!==0 && allProductsFetched==false)&&<LoadMore 
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            loadMore={async()=>{
                setStart(start+inc);
                setEnd(end+inc);
            }}/>}
        </section>
    )
}