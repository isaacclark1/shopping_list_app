import ServerError from "@/lib/ServerError";
import { PrismaClient, User } from "@prisma/client";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { signInSchema } from "@/lib/zod";
import { redirect } from "next/navigation";

declare module "next-auth" {
  /*
    Returned by 'auth', 'useSession', 'getSession' and received as a prop of the SessionProvider React Context.
  */
  interface Session {
    user: {
      id?: string;
      firstName: string;
      lastName: string;
      username: string;
      householdId: number;
      role: string;
    };
  }

  // Extend the user type to include data from the database.
  interface User {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    householdId: number;
    role: string;
  }
}

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          if (!credentials) {
            throw new ServerError("Missing credentials", 400);
          }

          const { username, password } = await signInSchema.parseAsync(
            credentials
          );

          const user: User | null = await prisma.user.findUnique({
            where: {
              username,
            },
          });

          if (!user) {
            throw new ServerError("Invalid credentials provided", 401);
          }

          const isPasswordValid = bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new ServerError("Invalid credentials provided", 401);
          }

          return {
            id: String(user.id),
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            householdId: user.householdId,
            role: user.role,
          };
        } catch (error) {
          console.error("❌ Error in authorize function: " + error);

          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // User is available during sign-in
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.username = user.username;
        token.householdId = user.householdId;
        token.role = user.role;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.id as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        username: token.username as string,
        householdId: token.householdId as number,
        role: token.role as string,
        email: "",
        emailVerified: null,
      };

      return session;
    },
  },
});
