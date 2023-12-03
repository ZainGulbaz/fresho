import Image from "next/image"
import { Sallad1 } from "@/assets"
import { Sallad2 } from "@/assets"
import MenuCard from "./menucard"
import SectionName from "../commons/sectionname"
export default function Menu(){
    return (
        <section className="mt-16 w-full">
            <div className="flex justify-between">
                <Image src={Sallad1} objectFit="contain" alt="salad1" className="-top-32 relative -z-10 rounded-full"/>
                <SectionName subText="checkout" mainText="Menu"/>
                <Image className="-top-52 -right-4 rounded-full -z-10 relative" src={Sallad1} objectFit="contain" alt="salad1"/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
               {
                [1,2,3,4,5,6]?.map((data)=><MenuCard title="Peperroni Piza" description="This is the best pizza in the world, very tasty and wonderful wow just elegant" price={"$12"} key={data} />)
               }
            </div>
        </section>
    )
}