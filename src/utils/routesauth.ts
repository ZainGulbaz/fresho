import { UserData } from "./types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const route = {
    register: "/register",
    home: "/home",
    login: "/login",
    profile: "/profile",
    dashboard: "/dashboard"
};

export const routeHeaderAuth = {
    admin: [{ name: "Dashboard", route: route.dashboard }],
    customer: [
        { name: "Home", route: route.home },
        { name: "Menu", route: route.home },
        {
            name: "About",
            route: route.home,
        },
        {
            name: "Contact",
            route: route.home,
        },
    ],
};

const routes = {
    admin: [route.dashboard, route.login, route.register, route.profile],
    customer: [route.home, route.login, route.register, route.profile]
}

export type CookieData = {
    user: UserData,
    token: string
}

const routesWithOurAuth = {
    [route.home]: true,
    [route.login]: true,
    [route.register]: true
}

const dontAllowIndexPage=(router:AppRouterInstance,pathname:string)=>(pathname=="/")?router.push(route.home):null;

export function clientSideRouteAuth(router: AppRouterInstance, pathname: string, cookieData: CookieData) {
    try {

        dontAllowIndexPage(router,pathname);

        if (routesWithOurAuth[pathname]) return;

        if (!cookieData || !cookieData?.token) {
            router.push(route.login);
            return;
        }
        const { user } = cookieData;
        const { role } = user;

        if (!routes[role].includes(pathname)) router.push(routes[role][0]);
    }
    catch (err) {
        console.log(err);
    }
}
