import Image from "next/image"
import { Pizza } from "@/assets"
import RightArrow from "../icons/rightarrow"
import Link from "next/link"
export default function Hero() {
    return (<section className="flex justify-around mt-16 items-center">
        <div className="flex flex-col gap-8">
            <div className="flex flex-col text-2xl sm:text-6xl font-bold">
                <h2>Everything</h2>
                <h2>is better</h2>
                <h2>with a <span className="text-primary">Pizza</span></h2>
            </div>
            <div className="text-gray-400 text:xs sm:text-md">
                <p>Pizza is the missing piece that makes</p>
                <p>every day complete, a simple yet</p>
                <p>delicious joy in life</p>
            </div>
            <div className="flex gap-8 flex-col sm:flex-row">
                <Link href={""} className="bg-primary uppercase font-bold text-white rounded-full px-6 py-4  flex gap-4 items-center">
                    Order Now <RightArrow /> 
                </Link>
                <Link href={""} className="font-bold rounded-full px-6 py-4 flex gap-4 items-center">
                    Learn More <RightArrow color="black"/>
                </Link>
            </div>
        </div>
        <Image src={Pizza} alt="pizza" className="h-36 sm:h-80 w-36 sm:w-80" />
    </section>)
}