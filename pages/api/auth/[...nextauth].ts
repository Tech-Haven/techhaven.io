import NextAuth, { NextAuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { UserInterface } from 'myTypes';

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID,
      clientSecret: process.env.KEYCLOAK_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
      authorization: { params: { scope: 'openid email profile discord' } },
      profile(profile) {
        return {
          id: profile.sub,
          username: profile.username,
          discord: {
            id: profile.discord_id,
            avatar: profile.discord_avatar,
            username: profile.discord_username,
            discriminator: profile.discord_discriminator,
          },
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, profile }) {
      const user = {} as UserInterface;
      if (profile?.sub && profile?.username) {
        user.id = profile.sub;
        user.username = profile.username;

        if (profile?.discord_id && profile?.discord_avatar) {
          user.discord = {
            id: profile.discord_id,
            avatar: profile.discord_avatar,
            username: profile.discord_username,
            discriminator: profile.discord_discriminator,
          };
        }

        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
