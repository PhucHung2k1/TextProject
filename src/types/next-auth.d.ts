import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      AccessToken?: string;
      Email: string;
      ExpiresIn: number;
      Id: string;
      IsVerified: boolean;
      RefreshToken?: string;
      RefreshTokenExpiresIn?: number;
      UserName: string;
      exp:number;
      iat: number;
      jti:string;
      PhoneNumber?: number;
    };
  }
}