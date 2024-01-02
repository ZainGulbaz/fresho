"use client";

import { HTMLInputTypeAttribute, SyntheticEvent } from "react";
import { useState } from "react";
import Select from "react-select";
import { MultiValue,ActionMeta } from "react-select";

export type Input = {
  name: string;
  placeholder: string;
  required?: boolean;
  type: HTMLInputTypeAttribute | "select" |"multi-select";
  options?: Option[];
  id: string;
};

export type MultiSelect={
  label:string,
  value:string,
  id:string
}

type Option = {
  option: string;
  label: string;
};
type Props = {
  title: string;
  inputs: Input[];
  handleSubmit: Function;
  setIsModal: Function;
  operation: "Add" | "Delete" | "Edit";
};

export default function ModalBody(props: Props) {

  const [multiSelVal,setMultiSelVal]:[multiSelVal:MultiValue<any>,setMultiSelVal:Function]=useState([]);  

  const handleSubmit = (event: SyntheticEvent) =>
  props?.handleSubmit(event, props,multiSelVal);

  const handleMultiSelect=(selectedOptions:MultiValue<any>,actionMeta:ActionMeta<any>,inputId:string)=>setMultiSelVal(selectedOptions?.map((option)=>({...option,id:inputId})));
  

  const closeModal = () => props?.setIsModal(false);
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <h4 className="text-lg font-bold text-dark">{props?.title}</h4>
        <form onSubmit={handleSubmit} className="w-3/4">
          {props?.inputs?.map((input: Input) => (
            <div className="w-full">
              <label className="text-sm font-medium text-gray-900 dark:text-white">
                {input.name}
              </label>
              {(input.type == "text" || input.type=="number") && (
                <input
                  type={input.type ? input.type : "text"}
                  id={input?.id}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                  placeholder={input.placeholder}
                  required={input.required ? input.required : true}
                  name={input.name}
                />
              )}
              {input.type == "select" && (
                <select
                  name={input.name}
                  id={input?.id}
                  placeholder={input.placeholder}
                  required={input.required ? input.required : true}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                >
                  {input?.options?.map((option) => (
                    <option value={option?.label}>{option?.option}</option>
                  ))}
                </select>
              )}
              {input.type == "multi-select" && (
                <Select
                  isMulti
                  name={input?.name}
                  id={input?.id}
                  options={input.options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(multiValue,actionMode)=>handleMultiSelect(multiValue,actionMode,input.id)}
                  inputId={input?.id}
                  placeholder={input?.placeholder}
                />
              )}
              {
                input.type=="file" && <input type="file" id={input.id} />
              }
            </div>
          ))}

          <div className="self-end flex gap-1 mt-4">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  self-end"
            >
              {props?.operation}
            </button>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
