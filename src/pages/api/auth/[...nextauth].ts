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
        const { username, password, hasRefreshToken } = credentials as {
          username: string;
          password: string;
          hasRefreshToken: boolean;
        };

        const servicesAuthAPI = new AuthAPI();

        try {
          const { data, status, error } = await servicesAuthAPI.signIn({
            username,
            password,
            hasRefreshToken,
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
      session.user = token as any;

      return session;
    },
  },
};

export default NextAuth(authOptions);
