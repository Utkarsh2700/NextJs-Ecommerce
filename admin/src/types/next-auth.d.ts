import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
    } & DefaultSeession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
}

interface product {
  _id?: string;
  title: string;
  description: string;
  price: string;
  images?: [string];
  category: string;
  properties: Properties;
}

interface categories {
  name: string;
  _id: string;
  parent: Parent;
  properties: Properties[];
}

interface Parent {
  name: string;
  _id: string;
}

interface Properties {
  name: string;
  values: string[] | string;
  [key: string]: string;
}
