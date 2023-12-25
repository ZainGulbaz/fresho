export interface responseInterface{
    statusCode:number,
    message:string[],
    data?:any,
    error?:string
}

export type Roles= "admin"|"customer";

