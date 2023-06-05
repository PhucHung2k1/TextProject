import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userName: string;
      store: string;
      email: string;
      accessToken: string;
      refreshToken: string;
      lastName: string | null;
      firstName: string | null;
      expiresIn: number;
      refreshTokenExpiresIn: number;
      issued: any;
    };
  }
}