import { model, models,Schema } from "mongoose";

export const UserSchema= new Schema({
    name:{
     type:String,
     required:true
    },
    email:{
        type:String,
        unique:true,
        required:true

    },
    isGoogle:{
         type:String,
         required:false
    },
    password:{
        type:String,
        required:true,
        validate:(value:string)=>{

            if((!value.length) || value.length<5)
            {
                throw new Error("Password must be at least 5 characters");
            }
            if(!/\d/.test(value)){
                throw new Error("Password must contain a number");
            }

        }
    },
    role:{
        type:String,
        enum:["admin","customer"],
        default:"customer"
    }
});

export const User= models?.User  || model("User",UserSchema);

