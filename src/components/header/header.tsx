"use client";

import { route } from "@/utils/routesauth";
import Link from "next/link";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import strings from "@/utils/strings";
import { usePathname, useRouter } from "next/navigation";
import { UserData } from "@/utils/types";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { clientSideRouteAuth, routeHeaderAuth } from "@/utils/routesauth";
import { useSelector } from "react-redux";
import { TCartProduct } from "@/app/redux/actions/cart";
import useLocalStorage from "@/app/customhooks/useLocalStorage";
import CartIcon from "@/components/cart/carticon";

export default function Header() {

  
  const router = useRouter();
  const pathname=usePathname();

  const [cookies, setCookie, removeCookie] = useCookies(["fresho"]);
  const token = cookies.fresho;
  const session = useSession();
  const { data, status } = session;

  const [cartData,setCartData]=useLocalStorage<TCartProduct[]>("cart",[]);
  const [totalCartProducts,setTotalCartProducts]=useState<number>(0);

  const cartDataRedux= useSelector((store:any)=>store?.cartReducer?.products) || [];


  

  const getTotalCartItemsFromCartData=()=>{
     let totalProds=0;
     [...cartData,...cartDataRedux]?.map((product)=>totalProds+=product.quantity);
     
     setTotalCartProducts(totalProds);
  };

  useEffect(()=>{
    console.log("Calculating again....");
    console.log(cartDataRedux);
    getTotalCartItemsFromCartData();
  },[cartDataRedux])


  useEffect(() => {
    clientSideRouteAuth(router,pathname,cookies.fresho);
    getTotalCartItemsFromCartData();
  }, []);

  // useEffect(()=>{
  //   console.log(cartData);
  // },[cartData]);

  let userData: Partial<UserData> = {};
    // if (status == "authenticated") {
    //   userData = {
    //     name: data?.user?.name + "",
    //   }
    // } else {
    //   userData = cookies?.fresho?.user;
    // }

  const handleLogout = async () => {
    const toastId = toast.loading("Loging out....");
    if (status == "authenticated") {
      await signOut();
      //localStorage.setItem("fresho_google", "false");
    } else {
      removeCookie("fresho");
      //localStorage.clear();
    }

    setTimeout(() => {
      router.push(route.login);
      toast.dismiss(toastId);
      toast.success(strings.logout_success);
    }, 2500);
  };

  return (
    <nav className="flex justify-between items-center">
      <div className="flex items-center gap-4 font-semibold text-gray-500">
        <Link href={route.home} className=" text-primary font-bold text-3xl mr-4">
          Fresho
        </Link>
        {routeHeaderAuth?.[userData?.["role"] || "customer"]?.map((route) => (
          <button onClick={()=>router.push(route.route)}>{route.name}</button>
        ))}
      </div>
      <div className="flex items-center gap-4 font-semibold text-gray-500">

<div className="mr-4">
<CartIcon products={totalCartProducts}/>
</div>
       
        {!token && status == "unauthenticated" && (
          <Link href={route.login}>Login</Link>
        )}
        {!token && status == "unauthenticated" && (
          <Link
            href={route.register}
            className="bg-primary px-6 py-2 text-white rounded-2xl"
          >
            Register
          </Link>
        )}
        {(token || status == "authenticated") && (
          <>
            <Link href={route.profile}>
              Hello, <strong>{userData?.["name"]}</strong>
            </Link>
            <button
              className="bg-primary px-6 py-2 text-white rounded-2xl"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
      <Toaster />
    </nav>
  );
}
