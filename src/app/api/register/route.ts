import { NextRequest } from "next/server";
import { responseInterface } from "../utils/types";
import { statusCodes,errors, errorCodes } from "../utils/constants";
import { User } from "@/database/Models/User";
import dbConnect from "@/database/connection";
import { Strings } from "../utils/strings";
import * as bcrypt from "bcrypt";


export async function POST(req:NextRequest){
    const responsePayload:responseInterface={
        statusCode:statusCodes.badRequest,
        message:[]
    }
    try{

     const{email,password}=await req.json();

     const salt= await bcrypt.genSalt();
     const hashedPassword=await bcrypt.hash(password,salt);

     const invalidPass=validatePasswordPattern(password);
     if(invalidPass){
        responsePayload.statusCode=statusCodes.badRequest;
        responsePayload.error=errors.badRequest;
        responsePayload.message.push(invalidPass);
        return;
     }

     await dbConnect();
     let user= new User({email,password:hashedPassword});
     let response= await user.save();
     if(response?._id){
        responsePayload.data={user:response};
        responsePayload.statusCode=statusCodes.ok;
        responsePayload.message.push(Strings.registration_success);
        return;
     }
     else throw new Error(Strings.invalid_database_insertion);

    }
    catch(err:any)
    {
        responsePayload.error=errors.badRequest;
        responsePayload.statusCode=statusCodes.badRequest;
        if(err.code==errorCodes.duplicateEntry) {
            responsePayload.message.push(Strings.duplicate_email);
        }
        else responsePayload.message.push(...[Strings.registration_failed,err.message]);
        
    }
    finally{
       
    return Response.json({...responsePayload});
    }
}

const validatePasswordPattern=(password:string)=>{
           if((!password.length) || password.length<5)
            {
                return "Password must be at least 5 characters";
            }
            else if(!/\d/.test(password)){
                return "Password must contain a number"
            }
            return "";
}
