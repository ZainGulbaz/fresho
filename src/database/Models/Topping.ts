import { Schema,models,model } from "mongoose";


const ToppingSchema=new Schema({
    
    name:{
        type:String,
        unique:true,
        required:true
    },
    price:{
        type:Number,
        required:true
    }


});

export const Topping= models.Topping || model("Topping",ToppingSchema);