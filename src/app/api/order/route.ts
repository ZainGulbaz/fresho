import { NextRequest, NextResponse } from "next/server";
import { responseInterface } from "../utils/types"
import { getUser, roleAuthentication } from "../utils/commons";
import { errors, statusCodes } from "../utils/constants";
import { Strings } from "../utils/strings";
import { Order } from "@/database/Models/Order";
import dbConnect from "@/database/connection";
const Product = require("../../../database/Models/Product");
const User= require("../../../database/Models/User");


export const POST = async (req: NextRequest) => {
    const responsePayload: responseInterface = {
        statusCode: 0,
        message: [],
        data: {}
    };

    const reqHeaders = new Headers(req.headers);


    try {
        const {
            products,
            address
        } = await req.json();

        const jwtData = JSON.parse(reqHeaders.get("jwtdata")!);
        const user = await getUser(jwtData?.email!);
        await roleAuthentication(user, ["customer"]);

        const orderBP = new Order({
            address,
            products,
            user: user._id
        });

        const order = await orderBP.save();

        if (order._id) {
            responsePayload.statusCode = statusCodes.ok;
            responsePayload.message = [Strings.order_success];
            responsePayload.data = { order };
            return;
        }
        throw new Error(Strings.order_failure);
    }
    catch (err: any) {

        if (err.code == statusCodes.unAuthorized) {
            responsePayload.statusCode = statusCodes.unAuthorized;
            responsePayload.error = errors.unAuthorized;
            responsePayload.message = [err.message];

        }
        else {
            responsePayload.statusCode = statusCodes.badRequest;
            responsePayload.error = errors.badRequest;
            responsePayload.message = [Strings.order_failure];

        }
    }
    finally {
        return NextResponse.json(responsePayload);
    }
}

export const GET=async(req:NextRequest)=>{
 const responsePayload:responseInterface ={
    statusCode:0,
    message:[]
 }
 try{
    await dbConnect();
    let findObj={};
    const status= req.nextUrl.searchParams.get("status");
    const delivered= req.nextUrl.searchParams.get("delivered");

    const start= req.nextUrl.searchParams.get("start");
    const end= req.nextUrl.searchParams.get("end");

    const reqHeaders= new Headers(req.headers);
    const jwtData = JSON.parse(reqHeaders.get("jwtdata")!);
    const user = await getUser(jwtData?.email!);
    await roleAuthentication(user,["admin","customer"]);

    if(user.role!=="admin"){
        findObj={_id:user._id};
    }
    if(status){
        findObj={...findObj,status};
    }
    if(delivered){
        findObj={...findObj,delivered};
    }
    if(start && end){
        findObj={...findObj,updatedAt:{$gte:new Date(parseInt(start)*1000),$lte:new Date(parseInt(end)*1000)}};
    }

    console.log(findObj);
    const order= await Order.find(findObj).populate([{path:"user",select:["-password"]},"products"]);
    
    responsePayload.statusCode=statusCodes.ok;
    responsePayload.message=[Strings.order_fetch_success];
    responsePayload.data={order};
     

 }  
 catch(err:any){

    if (err.code == statusCodes.unAuthorized) {
        responsePayload.statusCode = statusCodes.unAuthorized;
        responsePayload.error = errors.unAuthorized;
        responsePayload.message = [err.message];

    }
    else {
        responsePayload.statusCode = statusCodes.badRequest;
        responsePayload.error = errors.badRequest;
        responsePayload.message = [Strings.order_failure,err.message];

    }

 }  
 finally{
    return NextResponse.json(responsePayload);
 }
}