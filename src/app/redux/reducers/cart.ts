import { CartActionName } from "../actions/cart"

let cartCache={products:[] as any};

export const cartReducer=(initialState=[],action:TAction)=>{
    try{
    if(action.type===CartActionName){
        const newProducts=[...cartCache.products,action.payload]
        cartCache.products=newProducts;
        return {products:newProducts};
    }
    return initialState;
}
catch(error:any){
    console.log("Error in cart reducer",error?.message);
    return initialState
}
}