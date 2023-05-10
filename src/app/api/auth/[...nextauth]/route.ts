import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import {
  CredentialsProvider,
  CredentialsProviderType,
} from "next-auth/providers/credentials";
import * as dotenv from "dotenv";
dotenv.config();

import { comparePassword } from "../../../../../lib/encrypt";

// type credentials = { email: string; password: string };

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    Credentials({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
