import { NextRequest, NextResponse } from "next/server"
import { errorCodes, errors, statusCodes } from "../utils/constants"
import { responseInterface } from "../utils/types"
import {Category} from "@/database/Models/Category"
import dbConnect from "@/database/connection"
import { Strings } from "../utils/strings"
import { getUser, roleAuthentication } from "../utils/commons"

export const POST=async(req:NextRequest)=>{
    const responsePayload:responseInterface={
        statusCode:0,
        message:[],
        data:{}
    }
    try{

        await dbConnect();
        const {name}= await req.json();

        const reqHeaders = new Headers(req.headers);
        const jwtData = JSON.parse(reqHeaders.get("jwtdata")!);
        const user = await getUser(jwtData?.email!);
        await roleAuthentication(user, ["admin"]);
        
        let categoryBP=new Category({name});
        let category= await categoryBP.save();
        
        if(category.id){
            responsePayload.statusCode=statusCodes.ok;
            responsePayload.message=[Strings.category_success];
            responsePayload.data={category}
        }
        else{
            throw new Error(Strings.category_failed);
        }

    }
    catch(err:any)
    {
        responsePayload.error=errors.badRequest;
        responsePayload.statusCode=statusCodes.badRequest;
        if(err.code==errorCodes.duplicateEntry) {
            responsePayload.message.push(Strings.duplicate_category);
        }
        else responsePayload.message.push(...[Strings.category_failed,err.message]);

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

        const reqHeaders = new Headers(req.headers);
        const jwtData = JSON.parse(reqHeaders.get("jwtdata")!);
        const user = await getUser(jwtData?.email!);
        await roleAuthentication(user, ["admin"]);
         
         const id=req.nextUrl.searchParams.get("id");
         console.log(id);
         
         if(id) findObj["_id"]=id;

         const categories=await Category.find(findObj);
         responsePayload.statusCode=statusCodes.ok;
         responsePayload.data={categories};
         responsePayload.message=[Strings.category_fetch_success];
    }
    catch(err:any)
    {
        responsePayload.message=[Strings.category_fetch_failure,err.message];
        responsePayload.statusCode=statusCodes.badRequest;

    }
    finally{
        return NextResponse.json(responsePayload);
    }
  
}