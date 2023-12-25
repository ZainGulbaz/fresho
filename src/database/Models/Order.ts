import { Schema,models,model,Types } from "mongoose";


const OrderScehma= new Schema({
    products:[{type:Types.ObjectId,ref:"Product"}],
    status:{
        type:String,
        enum:["paid","unpaid"],
        default:"unpaid",
    },
    delivered:{
        type:Boolean,
        default:false
    },
    address:{
        type:String,
        required:true
    },
},{
    timestamps:true
});

export const Order= models?.Order || model("Order",OrderScehma);