import { NextRequest, NextResponse } from "next/server";
import { responseInterface } from "../utils/types"
import { getUser, roleAuthentication } from "../utils/commons";
import { errors, statusCodes } from "../utils/constants";
import { Strings } from "../utils/strings";


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
        await roleAuthentication(user, "admin");


    }
    catch (err: any) {
        console.log(err.code);
        if (err.code == errors.unAuthorized) {
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