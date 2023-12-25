import { Topping } from "@/database/Models/Topping";
import dbConnect from "@/database/connection";
import { NextResponse,NextRequest } from "next/server"
import { responseInterface } from "../utils/types";
import { Strings } from "../utils/strings";
import { errorCodes, errors, statusCodes } from "../utils/constants";


export const POST=async(req:NextRequest)=>{
    const responsePayload:responseInterface={
        statusCode:0,
        message:[],
        data:{}
    }
    try{

        await dbConnect();
        const{price,name}=await req.json();

        const toppingBP= new Topping({name,price});
        const topping= await toppingBP.save();

        if(topping.id)
        {
            responsePayload.message=[Strings.topping_success];
            responsePayload.statusCode=statusCodes.ok;
            responsePayload.data={topping};
        }
        else throw new Error("Random....");


    }
    catch(err:any)
    {
        responsePayload.error=errors.badRequest;
        responsePayload.statusCode=statusCodes.badRequest;
        if(err.code==errorCodes.duplicateEntry) {
            responsePayload.message.push(Strings.topping_duplicate);
        }
        else responsePayload.message.push(...[Strings.topping_failure,err.message]);
    }
    finally{

        return NextResponse.json(responsePayload);

    }

}

export const GET=async(req:NextRequest)=>{
    const responsePayload:responseInterface={
        statusCode:0,
        message:[],
        data:{}
    }
    
    try{
        await dbConnect();
        const findObj:{_id?:string}={};
        
        const id=req.nextUrl.searchParams.get("id");

        if(id) findObj["_id"]=id;

        const toppings= await Topping.find(findObj);

        responsePayload.data={toppings};
        responsePayload.statusCode=statusCodes.ok;
        responsePayload.message=[Strings.topping_fetch_success];

    }
    catch(err:any){
        responsePayload.statusCode=statusCodes.badRequest;
        responsePayload.error=errors.badRequest;
        responsePayload.message=[Strings.topping_fetch_failure,err?.message];
    }
    finally{
      return NextResponse.json(responsePayload);
    }

}