"use client";
import FormInput from "@/components/commons/forminput";
import SectionName from "@/components/commons/sectionname";
import { UserData } from "@/utils/types";
import { useSession } from "next-auth/react";

export default function Profile(){

    const session=useSession();
    let user:Partial<UserData>={};
    let {status}=session;

    if(status=="unauthenticated"){
      try{
          user=JSON.parse(localStorage.getItem("fresho_user")+"");
      }
      catch(err){
      }
    }
    else if (status="authenticated"){
      user=session?.data?.user!;
    }
    
    return(
    <section className="flex flex-col items-center h-screen gap-4 mt-32">
        <SectionName mainText="Profile" subText="Your information with us."/>

        <img className="w-30 h-30 rounded-full b-2 border-gray-900" src={user?.image!} alt="Profile Avatar"/>

        <div className="mt-8">
        <h5>Name</h5>
        <FormInput error="" id="" name="" type="text" placeholer="null" onChange={()=>{}} value={user?.name+""} disabled={true} /> 
        </div>
 
      <div>
      <h5>Email</h5>
      <FormInput error="" id="" name="" type="email" placeholer="null" onChange={()=>{}} value={user?.email+""} disabled={true}/> 
      </div>
       


    
    </section>
    );
}