"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { getProducts,createProduct, ProductBody } from "./api";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import TableData from "../components/tabledata";
import ModalBody, { MultiSelect } from "../components/modalbody";
import { getFormJson } from "@/utils/commonfunctions";
import { Input } from "../components/modalbody";
import { getCategories } from "../categories/api";
import { Category } from "../categories/categories";
import { getToppings } from "../toppings/api";
import Image from "next/image";

type Row = {
  name: string;
  _id: string;
  Category: {
    name: string;
  };
  small: {
    price: number;
  };
  medium: {
    price: number;
  };
  large: {
    price: number;
  };
  Toppings: [
    {
      name: string;
      price: number;
    }
  ];
};

export default function Categories() {
  const [cookies, setCookie] = useCookies(["fresho"]);
  const [products, setProducts] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [progressPending, setProgressPending] = useState(false);
  const [inputs, setInputs]: [inputs: Input[], setInputs: Function] = useState([
    {
      name: "Name",
      placeholder: "Paperoni",
      id: "name",
      type:"text"
    },
    {
      name: "Small($)",
      placeholder: "Small",
      id: "small",
      type: "number",
    },
    {
      name: "Medium($)",
      placeholder: "Medium",
      id: "medium",
      type: "number",
    },
    {
      name: "Large($)",
      placeholder: "Large",
      id: "large",
      type: "number",
    },
  ]);

  async function handleAddModalSubmit(event: SyntheticEvent, props: any, multiSelectValues:MultiSelect[]) {
    try {
      event.preventDefault();

      const  body = getFormJson(event, ["text","number","select-one","multi-select","file"], multiSelectValues) as ProductBody;

      console.log(body);

      const response = await createProduct(cookies.fresho.token, body);

      if (response.statusCode === 200) {
        toast.success(response.message[0]);
        await fetchProducts();
        props?.setIsModal(false);
      } else {
        throw new Error(response.message[0]);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
    handleCategoriesAndToppings();
  }, []);

  const handleCategoriesAndToppings = async () => {
    const categoriesRes = await getCategories(cookies.fresho.token);
    const toppingsRes = await getToppings(cookies.fresho.token);

    setInputs([
      ...inputs,
      {
        name: "Category",
        placeholder: "Select Category",
        type: "select",
        options: categoriesRes?.data?.categories?.map((category: Category) => ({
          option: category?.name,
          label: category?._id,
        })),
        id: "categoryid",
      },
      {
        name: "Toppings",
        placeholder: "Select Category",
        type: "multi-select",
        options: toppingsRes?.data?.toppings?.map((topping: Category) => ({
          label: topping?.name,
          value: topping?._id,
        })),
        id: "toppingsids",
      },
      {
        name:"Upload Image",
        id:"file",
        type:"file"
      }
    ]);
  };

  const columns = [
    {
      name: "Id",
      selector: (row: Row) => row["_id"],
    },
    {
      name: "Name",
      selector: (row: Row) => row["name"],
    },
    {
      name: "Category",
      selector: (row: Row) => row["Category"]["name"],
    },
    {
      name: "Small($)",
      selector: (row: Row) => row["small"]["price"],
    },
    {
      name: "Medium($)",
      selector: (row: Row) => row["medium"]["price"],
    },
    {
      name: "Large($)",
      selector: (row: Row) => row["large"]["price"],
    },
    {
      name: "Topping",
      selector: (row: Row) => (
        <div className="flex flex-col gap-2">
          {row?.["Toppings"]?.map((topping) => (
            <div className="flex gap-1">
              <h5 className={`text-green-600 font-bold`}>{topping?.name}</h5>
              <h5 className="font-extrabold">${topping?.price}</h5>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const fetchProducts = async () => {
    try {
      setProgressPending(true);
      let response = await getProducts(cookies.fresho.token);

      if (response.statusCode == 200) {
        setProducts(response?.data?.products);
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

<img src="../../../../.next/server/app/uploads/abc.png" alt="test" />
      <TableData
        data={products}
        isModal={isModal}
        setIsModal={setIsModal}
        columns={columns}
        title={"Products"}
        progressPending={progressPending}
        modalBody={
          <ModalBody
            title={"Add Products"}
            inputs={inputs}
            setIsModal={setIsModal}
            operation={"Add"}
            handleSubmit={handleAddModalSubmit}
          />
        }
      />
    </>
  );
}
