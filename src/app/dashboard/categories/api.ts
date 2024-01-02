const api="/api/category";


type CategoryBody={
    name:string
}

export const getCategories=async (token:string)=>{
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


export const createCategory=async (token:string,body:CategoryBody)=>{
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