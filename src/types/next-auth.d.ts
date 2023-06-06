import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      Id: string;
      UserName: string;
      AccessToken: string;
      RefreshToken: string;
      ExpiresIn: number;
      RefreshTokenExpiresIn: number;
    };
  }
}