// next auth
import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// database
import prisma from "../../../../../lib/db";
import { comparePassword } from "../../../../../lib/encrypt";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {},
      async authorize(credentials) {
        await prisma.$connect();
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

        return {
          id: `${isUser.id}`,
          name: `${isUser.user_name} ${isUser.user_last}`,
          email: `${isUser.email}`,
          role: `${isUser.isAdmin}`,
        };
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt(params) {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      // // return final_token
      return params.token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
