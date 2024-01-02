"use client";

import { SyntheticEvent, useState } from "react";
import SectionName from "@/components/commons/sectionname";
import Link from "next/link";
import Categories from "./categories/categories";
import Products from "./products/products";
import Toppings from "./toppings/toppings";

export default function Dashboard() {
  const tabs = [
    {
      name: "Categories",
      component: <Categories />,
    },
    {
      name: "Products",
      component: <Products />,
    },
    {
      name: "Toppings",
      component: <Toppings />,
    }
  ];

  const [selected, setSelected] = useState(tabs[0]);

  const handleSelect = (event: SyntheticEvent, selectedTab: (typeof tabs)[0]) =>
    setSelected(selectedTab);

  return (
    <div className="h-screen w-full">
      <div className="mt-2">
        {SectionName({
          subText: "Customize your product",
          mainText: "Dashboard",
        })}
      </div>

      <div className="md:flex mt-4 h-3/4">
        <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
          {tabs?.map((tab) => (
            <li>
              <Link
                href="#"
                className={`inline-flex items-center px-4 py-3 rounded-lg  w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${
                  selected.name == tab?.name
                    ? "bg-gray-200"
                    : "bg-gray-50 hover:text-gray-900  hover:bg-gray-100"
                } `}
                onClick={(event) => handleSelect(event, tab)}
              >
                {tab?.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full min-h-full">
          {selected.component}
        </div>
      </div>
    </div>
  );
}
