import client from "@/lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const adminEmails = ["meutkarshsharma@gmail.com"];

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [Google],
  callbacks: {
    async jwt({ token, account, profile, user, session }) {
      // console.log({ token, account, profile, user, session });
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    signIn: ({ user, profile, email, credentials }) => {
      // console.log({ user, profile, email, credentials });
      if (user.email)
        if (adminEmails.includes(user?.email)) {
          return true;
        }
      return false;
    },

    session: ({ session, user, token }) => {
      // console.log({ user, session, token });
      if (token) {
        session.user.email = token.email; // Include email in the session
      }
      return session;
    },
    authorized({ auth }) {
      return !!auth;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
