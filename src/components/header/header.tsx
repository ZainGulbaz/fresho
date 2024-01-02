"use client";

import { route } from "@/utils/routesauth";
import Link from "next/link";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import strings from "@/utils/strings";
import { usePathname, useRouter } from "next/navigation";
import { UserData } from "@/utils/types";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { clientSideRouteAuth, routeHeaderAuth } from "@/utils/routesauth";

export default function Header() {
  
  const router = useRouter();
  const pathname=usePathname();

  const [cookies, setCookie, removeCookie] = useCookies(["fresho"]);
  const token = cookies.fresho;
  const session = useSession();
  const { data, status } = session;

  useEffect(() => {
    clientSideRouteAuth(router,pathname,cookies.fresho);
  }, []);

  let userData: Partial<UserData> = {};
    if (status == "authenticated") {
      userData = {
        name: data?.user?.name + "",
      };
    } else {
      userData = cookies?.fresho?.user;
    }

  const handleLogout = async () => {
    const toastId = toast.loading("Loging out....");
    if (status == "authenticated") {
      await signOut();
      //localStorage.setItem("fresho_google", "false");
    } else {
      removeCookie("fresho");
      //localStorage.clear();
    }

    setTimeout(() => {
      router.push(route.login);
      toast.dismiss(toastId);
      toast.success(strings.logout_success);
    }, 2500);
  };

  return (
    <header className="flex justify-between items-center">
      <nav className="flex items-center gap-4 font-semibold text-gray-500">
        <Link href={route.home} className=" text-primary font-bold text-3xl mr-4">
          Fresho
        </Link>
        {routeHeaderAuth?.[userData?.["role"] || "customer"]?.map((route) => (
          <button onClick={()=>router.push(route.route)}>{route.name}</button>
        ))}
      </nav>
      <nav className="flex items-center gap-4 font-semibold text-gray-500">
        {!token && status == "unauthenticated" && (
          <Link href={route.login}>Login</Link>
        )}
        {!token && status == "unauthenticated" && (
          <Link
            href={route.register}
            className="bg-primary px-6 py-2 text-white rounded-2xl"
          >
            Register
          </Link>
        )}
        {(token || status == "authenticated") && (
          <>
            <Link href={route.profile}>
              Hello, <strong>{userData?.["name"]}</strong>
            </Link>
            <button
              className="bg-primary px-6 py-2 text-white rounded-2xl"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </nav>
      <Toaster />
    </header>
  );
}
