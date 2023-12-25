"use client";
import { ChangeEventHandler } from "react"
import Ban from "../icons/ban";

type props={
    onChange:ChangeEventHandler<HTMLInputElement>,
    value:string,
    id:string,
    name:string,
    type:string,
    placeholer:string,
    error:string|undefined,
    className?:string,
    disabled?:boolean

}

export default function FormInput({onChange,value,name,id,type,placeholer,error,className,disabled=false}:props){
    return(
        <>
         <input type={type} id={id} name={name} onChange={onChange} value={value} className={"bg-gray-200 p-2 rounded-xl border-4 text-black w-full "+className}  placeholder={placeholer} disabled={disabled} />
        {(error)&&<span className="text-[#DC4C64] mb-2 -mt-1 flex items-center gap-1"><span className="font-bold"><Ban color="#DC4C64" width={20} height={20}/> {" "}</span>{error}</span>}
        </>
       
    )
} 