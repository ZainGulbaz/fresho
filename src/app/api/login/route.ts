import { NextRequest } from "next/server";
import dbConnect from "@/database/connection";
import { User } from "@/database/Models/User";
import * as bcrypt from "bcrypt";
import { Strings } from "../utils/strings";
import { responseInterface } from "../utils/types";
import { errors, statusCodes } from "../utils/constants";
import { generateToken } from "../utils/commons";


export async function POST(req:NextRequest){
    const responsePayload:responseInterface={
        statusCode:statusCodes.badRequest,
        message:[],
        data:null
    }
    const json= await req.json();
    const {email,password}=json;
    try{
        await dbConnect();
        let user= await User.findOne({email});
        if(user==null) throw new Error(Strings.no_user_found);

        let passMatch= bcrypt.compareSync(password,user?.["password"]);
        if(!passMatch) throw new Error(Strings.invalid_password);

        const token=generateToken(JSON.stringify({email}));

        
        responsePayload.statusCode=statusCodes.ok;
        responsePayload.message=[Strings.user_login_success];
        responsePayload.data={token,user:{
            name:user?.name,
            email:user?.email,
            id:user?._id,
            role:user?.role
        }};


    }
    catch(err:any){
        responsePayload.error=errors.badRequest;
        responsePayload.message=[err?.message];
        responsePayload.statusCode=statusCodes.badRequest;
    }
    finally{
        return Response.json(responsePayload);
    }
    
}