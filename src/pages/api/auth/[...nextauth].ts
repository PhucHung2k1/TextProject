import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { AuthAPI } from '@/services/auth.service/auth.service';

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
          userName: string;
          password: string;
        };

        const servicesAuthAPI = new AuthAPI();

        try {
          const { data, status, error } = await servicesAuthAPI.signIn({
            username: userName,
            password,
          });

          if (status === 200 && data) {
            return data;
          }

          throw new Error(error ? JSON.stringify(error) : 'Sign-in failed.');
        } catch (err: any) {
          throw new Error(`Error signing in: ${err.message}`);
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
