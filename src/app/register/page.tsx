"use client";

import { useFormik } from "formik";
import FormInput from "@/components/commons/forminput";
import Image from "next/image";
import { Google } from "@/assets";
import { statusCodes } from "../api/utils/constants";
import { responseInterface } from "../api/utils/types";
import * as yup from "yup";
import toast from "react-hot-toast/headless";


export default function register(){

  let validationSchema=yup.object({
    email:yup.string().required(),
    password:yup.string().required().max(20).min(8)

  });
    
    const formik= useFormik({
      initialValues:{
        email:"",
        password:""
      },
      onSubmit:async(data)=>{
        try{
        let response= await fetch("/api/register",{
           method:"POST",
           headers:{
            "Content-Type": "application/json"
           },
           body:JSON.stringify(data)
        });
        let responseJson:responseInterface=await response.json();
        if(responseJson.statusCode==statusCodes.ok)
        {
           toast.success(responseJson.message[0]);
        }
        else{
          throw new Error(responseJson.message[0]);
        }
      }
      catch(err:any)
      {
        console.log("Inside cath block....");
        toast.error(err.message);
      }
      },
      validationSchema
    })

    return (
        <section className="flex flex-col items-center justify-center gap-8 mt-20">
          <h4 className="text-primary text-4xl font-extrabold capitalize">
           register
          </h4>
          <form onSubmit={formik.handleSubmit} className="flex flex-col w-80 gap-1">
            
            <FormInput name="email" id="email" type="email" placeholer="Enter your email" onChange={formik.handleChange}  error={formik.errors.email} value={formik.values.email}/>
           
           <FormInput name="password" id="password" type="password" placeholer="Enter your password" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password}/>
           <button className="px-4 p-2 text-white font-bold bg-primary rounded-xl mt-4 ">Register</button>
           <h6 className="text-gray-400 text-sm mt-2 text-center">or Login with provider</h6>
           <button className="flex justify-center items-center gap-4 mt-2 py-2 px-4 font-bold border border-gray-200 hover:bg-gray-100 rounded-xl" type="submit">
            <Image src={Google} alt="Google Logo" className="rounded-full h-8 w-8" objectFit="contain"/>
            Login with Google
            </button>
          </form>
        </section>
    )
}