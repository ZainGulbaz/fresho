import Link from "next/link"
export default function Header(){
    return(
        <header className="flex justify-between">
        <Link href={"/"} className=" text-primary font-bold text-3xl">
          Fresho
        </Link>
        <nav className="flex items-center gap-4 font-semibold text-gray-500">
          <Link href="">Home</Link>
          <Link href="">Menu</Link>
          <Link href="">About</Link>
          <Link href="">Contact</Link>
          <Link href="" className="bg-primary px-6 py-2 text-white rounded-2xl">
            Login
          </Link>
        </nav>
      </header>

    )
}