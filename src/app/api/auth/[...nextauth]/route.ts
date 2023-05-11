import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import db from "../../../../../lib/db";
import * as dotenv from "dotenv";
dotenv.config();

import { comparePassword } from "../../../../../lib/encrypt";
import { SessionOptions } from "next-auth";

// type credentials = { email: string; password: string };

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    Credentials({
      credentials: {},
      async authorize(credentials) {
        console.log("is next working");
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // fine user
        const isUser: any = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });

        if (!isUser) {
          await prisma.$disconnect();
          throw new Error("No user found");
        }

        // compare password
        const isPassword = await comparePassword(password, isUser.password);

        if (!isPassword) {
          await prisma.$disconnect();
          throw new Error("Could not log you in");
        }

        // disconnect to db
        await prisma.$disconnect();
        return { email: isUser.email } as any;
      },
    }),
  ],

  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },

    // async jwt({token, user}){
    //   const dbUser = await
    // }
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
