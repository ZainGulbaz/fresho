"use client";

import Hero from "@/components/hero/hero";
import Menu from "@/components/menu/menu";
import About from "@/components/about/about";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Provider } from "react-redux";
import store  from "../redux/store/index";


export default function Home() {

  
  
  return (
   <>
   <Provider store={store}>
   <Header/>  
   <Hero/>
   <Menu/>
   <About/>
   <Footer/>
   </Provider>
   </>
  );

}
