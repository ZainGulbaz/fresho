"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { createCategory, getCategories } from "./api";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import TableData from "../components/tabledata";
import ModalBody from "../components/modalbody";
import { getFormJson } from "@/utils/commonfunctions";

export type Category={
  name:string,
  _id:string
  _v?:number
}

export default function Categories() {
  const [cookies, setCookie] = useCookies(["fresho"]);
  const [categories, setCategories] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [progressPending, setProgressPending] = useState(false);

  async function handleAddModalSubmit(event: SyntheticEvent, props: any) {
    try {
      event.preventDefault();

      const body = getFormJson(event, ["text"]) as { name: string };

      const response = await createCategory(cookies.fresho.token, body);
      
      if (response.statusCode === 200) {
        toast.success(response.message[0]);
        await fetchCategories();
        props?.setIsModal(false);

      } else {
        throw new Error(response.message[0]);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row: Category) => row["name"],
    },
    {
      name: "Id",
      selector: (row: Category) => row["_id"],
    },
  ];

  const fetchCategories = async () => {
    try {
      setProgressPending(true);
      let response = await getCategories(cookies.fresho.token);

      if (response.statusCode == 200) {
        setCategories(response?.data?.categories);
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
        data={categories}
        isModal={isModal}
        setIsModal={setIsModal}
        columns={columns}
        title={"Categories"}
        progressPending={progressPending}
        modalBody={
          <ModalBody
            title={"Add Categories"}
            inputs={[{ name: "Name", placeholder: "Italiano",id:"name",type:"text"}]}
            setIsModal={setIsModal}
            operation={"Add"}
            handleSubmit={handleAddModalSubmit}
          />
        }
      />
    </>
  );
}
