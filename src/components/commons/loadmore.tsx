"use client";

import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";

type Props={
    loadMore:Function,
    isLoading:boolean,
    setIsLoading:Function
}

export default function LoadMore(props:Props){

   const handleLoading=()=>props?.loadMore();
   

    return (<div
        className="fter:h-px my-24 flex items-center before:h-px before:flex-1  before:bg-gray-300 before:content-[''] after:h-px after:flex-1 after:bg-gray-300  after:content-['']">
        <button type="button"
            className="flex items-center rounded-full border border-gray-300 bg-secondary-50 px-3 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100"
            disabled={props?.isLoading}
            onClick={handleLoading}
            >
            {(!props?.isLoading) && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-4 w-4">
                <path fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd" />
            </svg>}
            <div className="flex gap-1 items-center"> 
            {!props?.isLoading && "View More"} 
            {(props?.isLoading) && <LoaderIcon/>}
            </div>
           
        </button>
    </div>)

}