import { loginSchema } from "@appkit/core";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { ExpressAuthConfig } from "@auth/express";
// src/lib/auth/auth.config.ts
import Credentials from "@auth/express/providers/credentials";

import { db } from "@/db";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";
import { usersService } from "@/modules/users/users.service";
import { ALLOWED_ORIGINS } from "@/utils/origins";
import { verifyPassword } from "@/utils/password";

export const credentialsProvider = Credentials({
  credentials: {
    email: {
      type: "email",
      label: "Email",
      placeholder: "johndoe@gmail.com",
    },
    password: {
      type: "password",
      label: "Password",
      placeholder: "*****",
    },
  },

  async authorize(credentials) {
    const result = loginSchema.safeParse(credentials);

    if (!result.success) {
      return null;
    }

    const { email, password } = result.data;

    const user = await usersService.findByEmail(email);

    if (!user || user.passwordHash === null) {
      return null;
    }

    const passwordValid = verifyPassword(user.passwordHash, password);

    if (!passwordValid) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  },
});

export const expressAuthConfig = {
  providers: [credentialsProvider],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      const redirectUrl = new URL(url);

      if (ALLOWED_ORIGINS.includes(redirectUrl.origin)) {
        return url;
      }

      if (redirectUrl.origin === baseUrl) {
        return url;
      }

      return baseUrl;
    },
  },

  trustHost: true,
} satisfies ExpressAuthConfig;
