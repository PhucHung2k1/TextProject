<<<<<<< Updated upstream
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (email !== "john@gmail.com" && password !== "123456") {
          throw new Error("invalid credentials");
        }
        // if everything is fine
        return {
          id: "1234",
          name: "John Doe",
          email: "john@gmail.com",
          role: "admin",
        };
=======
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { AuthAPI } from '@/services/auth.service/auth.service'

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { userName, password } = credentials as {
          userName: string
          password: string
        }

        const servicesAuthAPI = new AuthAPI()

        try {
          const { data, status, error } = await servicesAuthAPI.signIn({
            username: userName,
            password,
          })

          if (status === 200 && data) {
            return data
          }

          throw new Error(error ? JSON.stringify(error) : 'Sign-in failed.')
        } catch (err: any) {
          throw new Error(`Error signing in: ${err.message}`)
        }
>>>>>>> Stashed changes
      },
    }),
  ],
  pages: {
<<<<<<< Updated upstream
    signIn: "/login",
  },
  callbacks: {
    jwt(params) {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      // return final_token
      return params.token;
    },
  },
};

export default NextAuth(authOptions);
=======
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token as any
      return session
    },
  },
}

export default NextAuth(authOptions)
>>>>>>> Stashed changes
