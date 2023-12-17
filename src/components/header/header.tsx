"use client";

import { route } from "@/utils/contstants"
import Link from "next/link"
import { useCookies } from "react-cookie";
import toast,{ Toaster } from "react-hot-toast";
import strings from "@/utils/strings";
import { useRouter } from "next/navigation";

export default function Header(){
    const router=useRouter();
    const [cookies,setCookie,removeCookie]=useCookies(["fresho"]);
    const token= cookies.fresho;
    
    const handleLogout=()=>{
       removeCookie("fresho");
       toast.success(strings.logout_success);
       setTimeout(()=>{
         router.push(route.login);
       },3000);
    }

    return(
        <header className="flex justify-between items-center">
        <nav className="flex items-center gap-4 font-semibold text-gray-500">
        <Link href={"/"} className=" text-primary font-bold text-3xl mr-4">
          Fresho
        </Link>
          <Link href={route.home}>Home</Link>
          <Link href="">Menu</Link>
          <Link href="">About</Link>
          <Link href="">Contact</Link>
          
        </nav>
        <nav className="flex items-center gap-4 font-semibold text-gray-500">
        {(!token)&&<Link href={route.login}>Login</Link>}
        {(!token)&&<Link href={route.register} className="bg-primary px-6 py-2 text-white rounded-2xl">
            Register
          </Link>}
          {(token)&&<button className="bg-primary px-6 py-2 text-white rounded-2xl" onClick={handleLogout}>Logout</button>}
        </nav>
      <Toaster/>
      </header>

    )
}