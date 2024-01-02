import NextAuth from "next-auth/next";
import { AuthObj } from "./authObj";

const handler = NextAuth(AuthObj);

export {handler as GET, handler as POST }