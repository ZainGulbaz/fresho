
let api="/api/product";


export type ProductBody={
    name:string,
    toppingsids:string[],
    categoryid:string,
    large:number,
    medium:number,
    small:number,
    file:File|string,
}

export const getProducts=async (token:string,queryParams:{[key:string]:string}={})=>{
    try{
       
        let params:URLSearchParams|string="";
        if(queryParams){
         params=new URLSearchParams(queryParams);
         }   

     let response= await fetch(api+(params?"?":null)+params,{
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

     let response= await fetch(api,{
        method:"POST",
        headers:{
            authorization:`Bearer ${token}`,
        },
        body:JSON.stringify(body),
     });
     return await response.json();
    }
    catch(error:any)
    {
        throw new Error(error);
    }
}