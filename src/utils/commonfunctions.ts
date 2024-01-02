import { MultiSelect } from "@/app/dashboard/components/modalbody";
import { SyntheticEvent } from "react";

type RequiredField = "text" | "select-one" | "button" | "number" | "multi-select" | "file";
type Field = {
    name: string,
    value: string | number | string[],
    type: RequiredField,
    id: string
}

export function getFormJson(event: SyntheticEvent, fields: RequiredField[], multiSelectValues: MultiSelect[] = []) {

    try {

        const json: { [key: string]: any } = {};


        const target: any = event.target;

        for (let i = 0; i < target.length; i++) {
            const field: Field = target[i];
            if (!field || fields.includes(field.type) == false) continue;
            if (field.type == "file") json[field.id] = (field as HTMLInputElement)?.files?.[0];
            else json[field.id] = field.value;
        }

        if (fields.includes("multi-select")) {
            multiSelectValues?.map((option) => {
                if (json[option.id]) {
                    json[option?.id] = [...(json[option?.id] as string[]), option.value]
                }
                else {
                    json[option?.id] = [option.value];
                }

            })
        }

        return json;
    }
    catch (err: any) {
        console.log(err.message);
    }
}


export const capitalize = (str: string) => str[0].toUpperCase() + str.substring(1);


export const generateRandomColor = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};


export function getFormDataFromJson(body: any) {
    try {

        const formData = new FormData();

        Object.entries(body)?.map((arr) => {
            formData.append(arr[0], arr?.[1] as string | File);
        });

        return formData;
    }
    catch (err: any) {
        throw new Error(err);
    }

}  