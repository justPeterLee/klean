/* eslint-disable no-unused-vars */
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string; // Add the role property
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: any;
      name: any;
      email: any;
      role: any;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string; // Add the role property
  }
}
