import prismadb from "@/lib/prismadb"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare, hash } from "bcryptjs"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismadb as any),
  pages: {
    signIn: "/admpanel/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null
        }

        const user = await prismadb.user.findUnique({
          where: {
            username: credentials.username,
          },
        })

        if (
          !user ||
          !(await compare(credentials.password, user.hashedPassword!))
        ) {
          return null
        }

        return {
          id: user.id,
          username: user.username,
          password: user.hashedPassword,
          isActivated: user.isActivated,
          isSuperAdmin: user.isSuperAdmin,
          randomKey: hash(user.username, 12),
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          email: token.email,
          isActivated: token.isActivated,
          isSuperAdmin: token.isSuperAdmin,
          randomKey: token.randomKey,
        },
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          username: u.username,
          email: u.email,
          isActivated: u.isActivated,
          isSuperAdmin: u.isSuperAdmin,
          randomKey: u.randomKey,
        }
      }
      return token
    },
  },
}
