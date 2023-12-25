import { Product } from "@/database/Models/Product";
import dbConnect from "@/database/connection";
import { Category } from "@/database/Models/Category";
import { Topping } from "@/database/Models/Topping";
import { NextRequest,NextResponse } from "next/server";
import { responseInterface } from "../utils/types";
import { errorCodes, errors, statusCodes } from "../utils/constants";
import { Strings } from "../utils/strings";
import { model, models } from "mongoose";

export const POST=async(req:NextRequest)=>{
    const responsePayload:responseInterface={
        statusCode:0,
        message:[],
        data:{}
    }
    try{

        await dbConnect();
        const {toppingIds,categoryId,name,small,medium,large}=await req.json();
        const productBP= new Product({name,Toppings:toppingIds,Category:categoryId,small:{
            price:small
        },medium:{
            price:medium
        },large:{
            price:large
        }});
        const product= await productBP.save();

        if(product)
        {
            responsePayload.statusCode=statusCodes.ok;
            responsePayload.data={product};
            responsePayload.message=[Strings.product_success];
            return;

        }
        throw new Error("Random....");

    }
    catch(err:any)
    {
        responsePayload.error=errors.badRequest;
        responsePayload.statusCode=statusCodes.badRequest;
        if(err.code==errorCodes.duplicateEntry) {
            responsePayload.message.push(Strings.product_duplicate);
        }
        else responsePayload.message.push(...[Strings.product_failure,err.message]);

    }
    finally{
        return NextResponse.json(responsePayload)

    }

}


export const GET=async(req:NextRequest)=>{
    const responsePayload:responseInterface={
        statusCode:0,
        message:[],
        data:{}
    }

    try{

        const findObj:{_id?:string}={};
        const id= req.nextUrl.searchParams.get("id"); 

        await dbConnect();

        if(!models.Category){
             await Category.findOne();;
        }
        if(!models.Topping){
             await Topping.findOne();
        }
    

        if(id) findObj["_id"]=id;

        let products= await (Product.find(findObj).populate(["Category","Toppings"]));
        
        responsePayload.statusCode=statusCodes.ok;
        responsePayload.data={products};
        responsePayload.message=[Strings.product_fetch_success];

    }
    catch(err:any)
    {
        responsePayload.statusCode=statusCodes.badRequest;
        responsePayload.error=errors.badRequest;
        responsePayload.message=[Strings.product_fetch_failure,err.message];
    }
    finally{

        return NextResponse.json(responsePayload);

    }

}