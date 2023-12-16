import Hero from "@/components/hero/hero";
import Menu from "@/components/menu/menu";
import About from "@/components/about/about";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
   <>
   <Hero/>
   <Menu/>
   <About/>
   <Toaster/>
   </>
  );
}
