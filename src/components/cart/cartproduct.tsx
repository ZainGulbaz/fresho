import { TCartProduct } from "@/app/redux/actions/cart";

type Props={
    product:TCartProduct
}

function CartProduct({product}:Props){
    return(
        <div className="border-2 p-4 rounded-xl border-gray-100">
           
           <div className="!opacity-200">
            
           <h4><span className="font-bold text-primary">Product: </span>{product?.name}</h4>
           <h4><span className="font-bold text-primary">Price: </span>{product?.price}</h4>
           <h4><span className="font-bold text-primary">quantity: </span>{product?.quantity}</h4>
            
             </div>
         
        
        </div>
    )
};


export default CartProduct;