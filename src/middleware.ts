import { NextRequest, NextResponse } from "next/server";
import { errors, statusCodes } from "./app/api/utils/constants";
import { Strings } from "./app/api/utils/strings";
import * as jose from "jose";

type JWTData={
    email:string,
    role?:string
}

export const middleware=async(req:NextRequest)=>{

    try{
    const reqHeaders= new Headers(req.headers);
    const authHeader=reqHeaders.get("authorization");
    const [bearer,token]=authHeader?.split(" ") || [null,"null"];

    const { payload: jwtData } = await jose.jwtVerify(
        token!, new TextEncoder().encode(process.env.JWT_SECRET_KEY!)
    );

    if(bearer==null || !jwtData?.email)
    {
        throw new Error("Random")
    }

   reqHeaders.set("jwtdata",JSON.stringify(jwtData)); 

   return NextResponse.next({
    request:{
        headers:reqHeaders
    }
   });
}
catch(err:any)
{
    return NextResponse.json({
        statusCode:statusCodes.unAuthorized,
        error:errors.unAuthorized,
        message:[Strings.unauthorized_user,err.message]
    })

}

}
export const config={
    matcher:["/api/category/","/api/product","/api/topping","/api/order"]
}