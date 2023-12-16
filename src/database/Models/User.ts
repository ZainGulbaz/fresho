import { model, models,Schema } from "mongoose";

const UserSchema= new Schema({
    email:{
        type:String,
        unique:true,
        required:true

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
    }
});

export const User= models?.User  || model("User",UserSchema);

