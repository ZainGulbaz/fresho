import { getFormDataFromJson } from "@/utils/commonfunctions";

const api="/api/product";


export type ProductBody={
    name:string,
    toppingsids:string[],
    categoryid:string,
    large:number,
    medium:number,
    small:number,
    file:File
}

export const getProducts=async (token:string)=>{
    try{

     let response= await fetch(api,{
        method:"GET",
        headers:{
            authorization:`Bearer ${token}`
        },
     });
     return await response.json();
    }
    catch(error:any)
    {
        throw new Error(error);
    }
}


export const createProduct=async (token:string,body:ProductBody)=>{
    try{

     const formData= getFormDataFromJson(body);
        
     let response= await fetch(api,{
        method:"POST",
        headers:{
            authorization:`Bearer ${token}`,
        },
        body:formData

     });
     return await response.json();
    }
    catch(error:any)
    {
        throw new Error(error);
    }
}