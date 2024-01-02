import { Schema,model,models } from "mongoose";

const productSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    Category:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Category"
    },
    Toppings:[{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Topping"
    }],
    small:{
        price:{
            type:Number,
            required:true
        }
    },
    medium:{
        price:{
            type:Number,
            required:true
        }
    },
    large:{
        price:{
            type:Number,
            required:true
        }
    },
    image:{
        type:String,
    }
})

export const Product= models.Product || model("Product",productSchema);