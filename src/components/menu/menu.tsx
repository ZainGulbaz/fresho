"use client";

import Image from "next/image";
import { Sallad1 } from "@/assets";
import { Sallad2 } from "@/assets";
import MenuCard from "./menucard";
import SectionName from "../commons/sectionname";
import { useCookies } from "react-cookie";
import { getProducts } from "@/app/dashboard/products/api";
import { useEffect, useState } from "react";
import CookiesHandler, { TCookies } from "@/utils/cookieshandler";
import toast, { Toaster } from "react-hot-toast";
import { TProduct } from "@/app/dashboard/products/products";
import Sekeleton from "../commons/skeleton";
import LoadMore from "../commons/loadmore";
import { getCategories } from "@/app/dashboard/categories/api";
import { Category } from "@/app/dashboard/categories/categories";

export default function Menu() {
  const inc = 2;

  const [products, setProducts]: [
    products: { [key: string]: TProduct[] },
    setProducts: Function
  ] = useState({});

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(2);
  const [prevValues, setPrevValues] = useState({ start, end });
  const [categories, setCategories] = useState<Category[]>([]);

  const [allProductsFetched, setAllProductsFetched] = useState(false);
  const sekeletons = [1, 2, 3, 4, 5, 6];
  const [cookies, setCookie] = useCookies(["fresho"]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCategories(cookies?.fresho?.token).then((res) => {
      setCategories(res?.data?.categories);
    });
  }, []);

  useEffect(() => {
    if (categories?.length > 0) handleGetProducts();
  }, [categories]);

  useEffect(() => {
    if (prevValues.start !== start && prevValues.end !== end) {
      setIsLoading(true);
      handleGetProducts().finally(() => setIsLoading(false));
    }
  }, [start, end]);

  const checkIfAllCategoriesFetched = () =>
    !(start + inc < categories?.length) ? setAllProductsFetched(true) : null;

  const handleGetProducts = async () => {
    try {
      if (start > categories?.length) {
        setAllProductsFetched(true);
        return;
      }

      let cookiesHandler = new CookiesHandler(cookies?.fresho as TCookies);
      const token = cookiesHandler.getToken() || "";
      const finalProducts: { [key: string]: TProduct[] } = {};

      const categoriesToFetched = categories.slice(start, end)?.map((cat) => {
        finalProducts[cat.name] = [];
        return cat?._id;
      });

      const response = await getProducts(token, {
        categories: JSON.stringify(categoriesToFetched),
      });

      checkIfAllCategoriesFetched();

      if (response.statusCode == 200) {
        let newProducts = response?.data?.products;
        newProducts?.map((product: TProduct) => {
          if (finalProducts[product?.Category?.name]) {
            finalProducts[product?.Category?.name].push(product);
          }
        });
        setProducts({ ...products, ...finalProducts });
      } else throw new Error(response?.message?.[0]);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <section className="mt-16 w-full">
      <Toaster />
      <div className="flex justify-between">
        <Image
          src={Sallad1}
          alt="salad1"
          className="-top-32 relative -z-10 rounded-full"
        />
        <SectionName subText="checkout" mainText="Menu" />
        <Image
          className="-top-52 -right-4 rounded-full -z-10 relative"
          src={Sallad2}
          alt="salad1"
        />
      </div>

      {Object.keys(products)?.map((category: string) => {
        const categoricalProducts = products[category];
        return (
          <div className="mt-6">
            <label className="text-lg font-extrabold capitalize">
              {category}
            </label>{" "}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {categoricalProducts?.length !== 0 ? (
                categoricalProducts?.map((product) => (
                  <MenuCard      
                    data={product}
                  />
                ))
              ) : (
                <h5 className="text-center text-xs mb-2 col-span-2">
                  No Products Found...
                </h5>
              )}
            </div>
          </div>
        );
      })}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {Object.keys(products)?.length == 0 &&
          sekeletons?.map((sekeleton) => <Sekeleton />)}
      </div>

      {Object.keys(products)?.length !== 0 && allProductsFetched == false && (
        <LoadMore
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          loadMore={async () => {
            setStart(start + inc);
            setEnd(end + inc);
          }}
        />
      )}
    </section>
  );
}
