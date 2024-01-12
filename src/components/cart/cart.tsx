"use client";

import React from "react";
import Modal from "react-modal";
import ModalFooter from "../commons/modalfooter";
import { modalCustomStyles } from "@/app/dashboard/components/tabledata";
import useLocalStorage from "@/app/customhooks/useLocalStorage";
import { TCartProduct } from "@/app/redux/actions/cart";
import CartProduct from "./cartproduct";

type Props = {
  isOpen: boolean;
  setIsOpen: Function;
};
const Cart = ({ isOpen, setIsOpen }: Props) => {
  const [data, setData] = useLocalStorage<TCartProduct[]>("cart", []);
  console.log("cart data", data);
  const toggleModal = () => setIsOpen(false);
  return (
    <Modal isOpen={isOpen} style={modalCustomStyles}>
      <div className="flex flex-col justify-center items-start">
        <h4 className="font-bold text-xl">My Cart</h4>

        <div className="flex flex-col gap-1 mt-6">
          {data?.map((cartProduct) => (
            <CartProduct product={cartProduct} />
          ))}
        </div>
      </div>
      <ModalFooter
        handleActivity={() => console.log("Actitty")}
        toggleModal={() => setIsOpen(false)}
        activityName="Confirm Order"
      />
    </Modal>
  );
};

export default Cart;
