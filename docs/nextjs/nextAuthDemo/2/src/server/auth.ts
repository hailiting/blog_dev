import CredentialsProvider from "next-auth/providers/credentials";
import {
  AuthOptions,
  getServerSession as nextAuthGetServerSession,
} from "next-auth";
export const authOptions: AuthOptions = {
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
export function getServerSession() {
  return nextAuthGetServerSession(authOptions);
}
