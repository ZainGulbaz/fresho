import { NextRequest,NextResponse } from "next/server";
import { responseInterface } from "../utils/types";
import { statusCodes,errors } from "../utils/constants";

export async function POST(req:NextRequest){
    const responsePayload:responseInterface={
        statusCode:statusCodes.badRequest,
        message:[]
    }
    try{

     const{email,password}=await req.json();
     console.log(email,password);

    }
    catch(err)
    {

    }
    finally{
       return Response.json(responsePayload);
    }


}