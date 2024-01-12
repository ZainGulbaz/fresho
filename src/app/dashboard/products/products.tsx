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
import { uploadImage } from "@/utils/cloudinary";
import strings from "@/utils/strings";

export type TProduct = {
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
  image:string
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

    const toastId= toast.loading(strings.product_create);
    
    try {
      event.preventDefault();

      const  body = getFormJson(event, ["text","number","select-one","multi-select","file"], multiSelectValues) as ProductBody;
      
      const file:string=await uploadImage(body["file"] as File);

      const response = await createProduct(cookies.fresho.token, {...body,file});

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
    finally{
      toast.dismiss(toastId);
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
      selector: (row: TProduct) => row["_id"],
    },
    {
      name: "Name",
      selector: (row: TProduct) => row["name"],
    },
    {
      name: "Category",
      selector: (row: TProduct) => row["Category"]["name"],
    },
    {
      name: "Small($)",
      selector: (row: TProduct) => row["small"]["price"],
    },
    {
      name: "Medium($)",
      selector: (row: TProduct) => row["medium"]["price"],
    },
    {
      name: "Large($)",
      selector: (row: TProduct) => row["large"]["price"],
    },
    {
      name: "Topping",
      selector: (row: TProduct) => (
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
        throw new Error(response?.message[0]);
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
