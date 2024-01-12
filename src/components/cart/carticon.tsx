"use client";
import { useState } from "react";
import Cart from "./cart";


type Props={
    products:number
}



export default function CartIcon({products}:Props) {
  const [openCart,setOpenCart]=useState(false);
  return (
      <div className="bg-white flex justify-center items-center h-full mb-2 cursor-pointer" 
       onClick={()=>setOpenCart(true)}
      >
        <div className="relative">
          <div className="absolute left-3">
            <p className="flex h-1 w-1 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
              {products}
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="file: mt-4 h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
        <Cart isOpen={openCart} setIsOpen={setOpenCart}/>
      </div>
  );
}
