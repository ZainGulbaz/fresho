import { Dispatch, SetStateAction, useState } from "react";
import { useEffect } from "react";

export default function useLocalStorage<dataT>(key: string, initialValue: dataT):[dataT,Dispatch<SetStateAction<dataT>>] {

    const alreadyStored = localStorage.getItem(key);
    if(alreadyStored!==null) {
        try{
        initialValue=JSON.parse(alreadyStored) as dataT;
        }
        catch(error:any)
        {
            initialValue=alreadyStored as dataT;
        }
    }

    const [value, setValue] = useState<dataT>(initialValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value,key])

    return [value, setValue];

}