import { route } from "@/utils/contstants"
import Link from "next/link"
export default function Header(){
    return(
        <header className="flex justify-between items-center">
        <nav className="flex items-center gap-4 font-semibold text-gray-500">
        <Link href={"/"} className=" text-primary font-bold text-3xl mr-4">
          Fresho
        </Link>
          <Link href={route.home}>Home</Link>
          <Link href="">Menu</Link>
          <Link href="">About</Link>
          <Link href="">Contact</Link>
          
        </nav>
        <nav className="flex items-center gap-4 font-semibold text-gray-500">
        <Link href="">Login</Link>
        <Link href={route.register} className="bg-primary px-6 py-2 text-white rounded-2xl">
            Register
          </Link>
        </nav>
      </header>

    )
}