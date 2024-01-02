"use client";

import DataTable from "react-data-table-component";
import { FC, ReactComponentElement, ReactElement, ReactNode, useState } from "react";
import Add from "@/components/icons/add";
import Modal from "react-modal";
import TableLoad from "@/components/commons/tableload";

type Props = {
  data: any;
  columns: any;
  title: string;
  modalBody:JSX.Element,
  isModal:boolean,
  setIsModal:Function,
  progressPending?:boolean
};

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:"30vw"
    },
  };

export default function TableData({ data, columns, title,modalBody,isModal,setIsModal,progressPending=false }: Props) {

    const toggleModal=()=>setIsModal(!isModal);

  return (
    <>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded flex text-md items-center gap-1"
    onClick={toggleModal}>
      <Add width={14} height={14}/> Add
    </button>
      <div className="mt-2">
      <DataTable
        data={data}
        columns={columns}
        pagination={true}
        title={title}
        progressComponent={<TableLoad/>}
        progressPending={progressPending}
        
      />
      </div>

     <Modal isOpen={isModal}
     onRequestClose={toggleModal}
     style={customStyles}
     contentLabel={title}
    

     >
        {modalBody}
    </Modal>

    </>
  );
}
