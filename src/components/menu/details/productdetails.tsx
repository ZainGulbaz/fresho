"use client";

import { modalCustomStyles } from "@/app/dashboard/components/tabledata";
import Modal from "react-modal";
import { TProduct } from "@/app/dashboard/products/products";
import ProductPrice from "./price";
import IncDecButton from "./increamentbtn";
import { CartAction, TCartProduct } from "@/app/redux/actions/cart";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useLocalStorage from "@/app/customhooks/useLocalStorage";
import toast from "react-hot-toast";
import strings from "@/utils/strings";
import ModalFooter from "@/components/commons/modalfooter";

type Props={
    isOpen:boolean,
    setIsOpen:Function,
    toggleModal:Function,
    data:TProduct
}

export default function ProductDetails({isOpen,setIsOpen,toggleModal,data}:Props){

    const[value,setValue]=useLocalStorage<TCartProduct[]>("cart",[]);

     const [noOfProducts, setNoOfProducts] =useState<number>(1);
     const [total,setTotal]=useState<number>(0);
     const dispatch=useDispatch();
     const closeModal=()=>setIsOpen(false);

     const handleCart=()=>{
      const cartProduct={name:data?.name,id:data?._id,price:total,quantity:noOfProducts};
      dispatch(CartAction(cartProduct));
      setValue([...value,cartProduct]);
      toast.success(strings.added_to_cart);
      closeModal();
    }

    return (
        <>
        <Modal
         isOpen={isOpen}
         style={modalCustomStyles}
        >
            <div className="flex flex-col justify-center items-start w-full gap-4">
            
            <div className="flex flex-col justify-center items-start">
                <h5 className="font-extrabold text-2xl uppercase mb-8">{data?.name}</h5>

                <div className="flex justify-start itmes-center gap-4">
                {(data?.image) && <img src={data?.image} alt={data?.name} className="w-40 h-40 object-cover rounded-lg"/>}
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, perferendis blanditiis rem atque officia incidunt temporibus, vitae magnam sint, doloribus non soluta fuga sunt culpa consequuntur eveniet aspernatur quod! Fugit, accusantium magnam.</p>
                </div>
                <ProductPrice data={data} noOfProducts={noOfProducts} setTotal={setTotal} total={total}/>

                <IncDecButton value={noOfProducts} setValue={setNoOfProducts}/>

            </div>

            <ModalFooter toggleModal={toggleModal} activityName="Add to Cart" handleActivity={handleCart}/>
            
            
            </div>
          

        </Modal>
        </>
    )
}