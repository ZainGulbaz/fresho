export const CartActionName="CART_ACTION";


export type TCartProduct={
    id:string,
    quantity:number,
    name:string,
    price:number
}

export const CartAction=(data:TCartProduct)=>{
    return{
        payload:data,
        type:CartActionName
    }
}