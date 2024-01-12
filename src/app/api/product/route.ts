import { Product } from "@/database/Models/Product";
import dbConnect from "@/database/connection";
import { Category } from "@/database/Models/Category";
import { Topping } from "@/database/Models/Topping";
import { NextRequest, NextResponse } from "next/server";
import { responseInterface } from "../utils/types";
import { errorCodes, errors, statusCodes } from "../utils/constants";
import { Strings } from "../utils/strings";
import { models } from "mongoose";
import {getUser, roleAuthentication } from "../utils/commons"


export const POST = async (req: NextRequest) => {
    const responsePayload: responseInterface = {
        statusCode: 0,
        message: [],
        data: {}
    }
    try {

        await dbConnect();

        const reqHeaders = new Headers(req.headers);
        const jwtData = JSON.parse(reqHeaders.get("jwtdata")!);
        const user = await getUser(jwtData?.email!);
        await roleAuthentication(user, ["admin"]);


        const { toppingsids, categoryid, name, small, medium, large, file } = await req.json();

        const productBP = new Product({
            name, Toppings: toppingsids, Category: categoryid, small: {
                price: small
            }, medium: {
                price: medium
            }, large: {
                price: large
            },
            image:file
        });
        const product = await productBP.save();

        if (product) {
            responsePayload.statusCode = statusCodes.ok;
            responsePayload.data = { product };
            responsePayload.message = [Strings.product_success];
            return;

        }
        throw new Error("Random....");

    }
    catch (err: any) {
        console.log(err);
        responsePayload.error = errors.badRequest;
        responsePayload.statusCode = statusCodes.badRequest;
        if (err.code == errorCodes.duplicateEntry) {
            responsePayload.message.push(Strings.product_duplicate);
        }
        else responsePayload.message.push(...[Strings.product_failure, err.message]);

    }
    finally {
        return NextResponse.json(responsePayload)

    }

}


export const GET = async (req: NextRequest) => {
    const responsePayload: responseInterface = {
        statusCode: 0,
        message: [],
        data: {}
    }

    try {

        const findObj: { _id?: string,"Category"?:any } = {};
        const id = req.nextUrl.searchParams.get("id");
        const start=parseInt(req.nextUrl.searchParams.get("start")||"0");
        const end=parseInt(req.nextUrl.searchParams.get("end")||"6");
        const categories=req.nextUrl.searchParams.get("categories");

        await dbConnect();

        if (!models.Category) {
            await Category.findOne();;
        }
        if (!models.Topping) {
            await Topping.findOne();
        }


        if (id) findObj["_id"] = id;
        if(categories) {
            try{
             findObj["Category"]={"$in":JSON.parse(categories)};
            }
            catch(error){

                throw new Error(Strings.categories_format_error);

            }
        }

        let products = await (Product.find(findObj).skip(start).limit(end-start).populate(["Category", "Toppings"]));

        responsePayload.statusCode = statusCodes.ok;
        responsePayload.data = { products };
        responsePayload.message = [Strings.product_fetch_success];

    }
    catch (err: any) {
        responsePayload.statusCode = statusCodes.badRequest;
        responsePayload.error = errors.badRequest;
        responsePayload.message = [Strings.product_fetch_failure, err.message];
    }
    finally {

        return NextResponse.json(responsePayload);

    }

}