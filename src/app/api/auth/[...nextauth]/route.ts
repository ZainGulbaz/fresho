import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";


export const AuthObj={
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID!,
            clientSecret:process.env.GOOGLE_SECRET!
        })
    ]
}

const handler = NextAuth(AuthObj);

export {handler as GET, handler as POST}