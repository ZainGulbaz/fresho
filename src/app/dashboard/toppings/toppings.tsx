"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { ToppingBody, createTopping, getToppings } from "./api";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import TableData from "../components/tabledata";
import ModalBody from "../components/modalbody";
import { getFormJson } from "@/utils/commonfunctions";

export type Category={
  name:string,
  _id:string,
  price:number
}

export default function Categories() {
  const [cookies, setCookie] = useCookies(["fresho"]);
  const [toppings, setToppings] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [progressPending, setProgressPending] = useState(false);

  async function handleAddModalSubmit(event: SyntheticEvent, props: any) {
    try {
      event.preventDefault();

      const body = getFormJson(event, ["text","number"]) as ToppingBody;

      const response = await createTopping(cookies.fresho.token, body);
      
      if (response.statusCode === 200) {
        toast.success(response.message[0]);
        await fetchToppings();
        props?.setIsModal(false);

      } else {
        throw new Error(response.message[0]);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchToppings();
  }, []);

  const columns = [
    {
        name: "Id",
        selector: (row: Category) => row["_id"],
      },
    {
      name: "Name",
      selector: (row: Category) => row["name"],
    },
    {
        name: "Price",
        selector: (row: Category) => <h4 className="text-green-500 font-bold"><strong className="text-slate-800">$</strong>{" "}{row["price"]}</h4>,
    }
  ];

  const fetchToppings = async () => {
    try {
      setProgressPending(true);
      let response = await getToppings(cookies.fresho.token);

      if (response.statusCode == 200) {
        setToppings(response?.data?.toppings);
      } else {
        throw new Error(response.message[0]);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setProgressPending(false);
    }
  };

  return (
    <>
      <Toaster />

      <TableData
        data={toppings}
        isModal={isModal}
        setIsModal={setIsModal}
        columns={columns}
        title={"Categories"}
        progressPending={progressPending}
        modalBody={
          <ModalBody
            title={"Add Categories"}
            inputs={[{name: "Name", placeholder: "Chapotle",id:"name",type:"text" },{ name: "Price", placeholder: "24",id:"price",type:"number"}]}
            setIsModal={setIsModal}
            operation={"Add"}
            handleSubmit={handleAddModalSubmit}
          />
        }
      />
    </>
  );
}
