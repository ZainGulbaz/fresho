"use client";

import { TProduct } from "@/app/dashboard/products/products";
import { useState, ChangeEvent } from "react";
import { useEffect } from "react";

const radioStyle =
  "relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]";

type Props = {
  data: TProduct;
  noOfProducts: number;
  setTotal: Function;
  total: number;
};

export default function ProductPrice({
  data,
  noOfProducts,
  total,
  setTotal,
}: Props) {
  type ProductTypes = "medium" | "small" | "large";

  const [productType, setProductType] = useState<ProductTypes>("small");

  const handleRadioButton = (event: ChangeEvent<HTMLInputElement>) => {
    const type = event.target?.value as ProductTypes;
    setProductType(type);
    setTotal(data?.[type]?.price * noOfProducts);
  };

  useEffect(() => {
    setTotal(data?.[productType]?.price * noOfProducts);
  }, []);

  return (
    <div className="flex justify-start items-center w-full mt-16">
      <div className="flex gap-4 justify-start items-center w-full">
        <div className="flex justify-center">
          <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
            <input
              className={radioStyle}
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="small"
              onChange={(event) => handleRadioButton(event)}
              checked={productType === "small"}
            />
            <label className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer">
              Small
            </label>
          </div>

          <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
            <input
              className={radioStyle}
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="medium"
              onChange={(event) => handleRadioButton(event)}
              checked={productType === "medium"}
            />
            <label className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer">
              Medium
            </label>
          </div>

          <div className="mb-[0.125rem] inline-block min-h-[1.5rem] pl-[1.5rem]">
            <input
              className={radioStyle}
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              value="large"
              onChange={(event) => handleRadioButton(event)}
              checked={productType === "large"}
            />
            <label className="mt-px inline-block pl-[0.15rem] hover:pointer-events-none">
              Large
            </label>
          </div>
        </div>
      </div>
      <span className="font-extrabold text-lg text-primary mr-4">{total}</span>
    </div>
  );
}
