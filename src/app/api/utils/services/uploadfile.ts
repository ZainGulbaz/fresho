import {writeFile} from "fs/promises";
import path from "path";


export class FileHandler{
    constructor(){

    }

    async uploadFile(file:File, folder:`${string}/`):Promise<string>{

        try{
        
        const fileData= Buffer.from(await file.arrayBuffer());

        const fileName=Date.now()+file.name;

        await writeFile(path.join(__dirname,`../../../../../public/uploads/${folder}`+fileName),fileData);

        return fileName;
        }
        catch(err:any){

            throw new Error(err);

        }
    }
}