const api="/api/topping";


export type ToppingBody={
    name:string,
    price:number
}

export const getToppings=async (token:string)=>{
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


export const createTopping=async (token:string,body:ToppingBody)=>{
    try{

     let response= await fetch(api,{
        method:"POST",
        headers:{
            authorization:`Bearer ${token}`
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