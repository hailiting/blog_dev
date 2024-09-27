import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // 接收参数
      credentials: {
        username: {
          label: "Username",
        },
      },
      async authorize(credentials, req) {
        // 验证参数
        if (!credentials) {
          return null;
        }
        return {
          ...credentials,
        };
      },
    }),
  ],
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
