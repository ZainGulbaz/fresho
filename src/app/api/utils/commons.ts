import * as jwt from "jsonwebtoken";

export function generateToken(data:string):string{
try{
  const token=jwt.sign(data,process.env.JWT_SECRET_KEY!);
  return token;
}
catch(err:any)
{
    throw new Error(err);

}

}