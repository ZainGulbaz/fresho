import { User } from "@/database/Models/User";
import dbConnect from "@/database/connection";
import * as jwt from "jsonwebtoken";
import { Strings } from "./strings";
import { Roles } from "./types";
import { UserSchema } from "@/database/Models/User";
import { errors } from "./constants";


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
    throw new Error(err);
  }
}


export async function roleAuthentication(user:any, role:Roles){
 try{
  if(user.role!==role){
      throw new Error(Strings.unauthorized_user);
  }
  return true;
}
catch(err:any){
  err.code=errors.unAuthorized;
  err.message=Strings.unauthorized_user;
  throw new Error(err);
}
}