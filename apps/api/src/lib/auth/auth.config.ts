import { loginSchema } from "@appkit/core";
// src/lib/auth/auth.config.ts
import Credentials from "@auth/express/providers/credentials";

import { usersService } from "@/modules/users/users.service";
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

    const passwordValid = verifyPassword(password, user.passwordHash);

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
