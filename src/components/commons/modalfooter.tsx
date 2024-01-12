"use client";

type Props={
    toggleModal:Function,
    handleActivity:Function,
    activityName:string
}

export default function ModalFooter({toggleModal,handleActivity,activityName}:Props){
    return(
    <>
    <div className="b-1 w-full h-[0.5px] bg-gray-200 mt-4"/>
            <div className="self-end flex gap-1 mt-2 mb-2">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  self-end"
              onClick={()=>handleActivity()}
            >
              {activityName}
            </button>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={()=>toggleModal()}
            >
              Cancel
            </button>
          </div>
    </>

    )

}