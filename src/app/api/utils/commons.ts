import { User } from "@/database/Models/User";
import dbConnect from "@/database/connection";
import * as jwt from "jsonwebtoken";
import { Strings } from "./strings";
import { Roles } from "./types";
import { CustomError, errors, statusCodes } from "./constants";


export function generateToken(data: string): string {
  try {
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY!);
    return token;
  }
  catch (err: any) {
    throw new Error(err);

  }

}


export async function getUser(email: string) {
  try {
    await dbConnect();

    const user = await User.findOne({ email });

    if (user == null) throw new Error("random");

    user["password"]=null;

    return user;

  }
  catch (err: any) {
    err.code=errors.unAuthorized;
    err.message=Strings.no_user_found;
    throw new CustomError(Strings.no_user_found,statusCodes.unAuthorized);
  }
}


export async function roleAuthentication(user:any, roles:Roles[]){
 try{
  if(roles.includes(user.role)==false){
      throw new Error(Strings.unauthorized_user);
  }
  return true;
}
catch(err:any){
  
  throw new CustomError(Strings.unauthorized_user,statusCodes.unAuthorized);
}
}


export function convertFormDataToJson(formData:FormData){
  const obj:{[key:string]:FormDataEntryValue}={};
  formData?.forEach((value,key)=>obj[key]=value);
  return obj;
}