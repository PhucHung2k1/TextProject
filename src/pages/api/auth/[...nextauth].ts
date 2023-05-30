// import { NextAuth } from 'next-auth';
// import { NextApiRequest, NextApiResponse } from "next";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const options = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "email",
//           type: "email",
//           placeholder: "jsmith@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials: any, req) {
//         const payload = {
//           email: credentials.email,
//           password: credentials.password,
//         };

//         const res = await fetch(
//           "https://cloudcoders.azurewebsites.net/api/tokens",
//           {
//             method: "POST",
//             body: JSON.stringify(payload),
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const user = await res.json();
//         if (!res.ok) {
//           throw new Error(user.message);
//         }
//         // If no error and we have user data, return it
//         if (res.ok && user) {
//           return user;
//         }

//         // Return null if user data could not be retrieved
//         console.log(req);
//         return null;
//       },
//     }),
//   ],

//   //   callbacks: {
//   //     async jwt({ token, user }) {
//   //       return { ...token, ...user };
//   //     },
//   //     async session({ session, token, user }) {
//   //       // Send properties to the client, like an access_token from a provider.
//   //       session.user = token;

//   //       return session;
//   //     },
//   //   },
//   pages: {
//     signIn: "/login",
//   },
// };

// export default (req: NextApiRequest, res: NextApiResponse) =>
//   NextAuth(req, res, options);
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        // email: { label: "Email", type: "email", placeholder: "hung@gmail.com" },
        // password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (email != "test123@gmail.com" && password !== "123456") {
          throw new Error("Invalied Credentials");
        }
        return {
          id: "1234",
          name: "Phuc Hung",
          email: "hungtest123@gmail.com",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
export default NextAuth(authOptions);
