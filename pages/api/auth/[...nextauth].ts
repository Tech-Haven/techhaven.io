import NextAuth, { NextAuthOptions } from 'next-auth';
import AuthentikProvider from 'next-auth/providers/authentik';
import { UserInterface } from 'myTypes';

export const authOptions: NextAuthOptions = {
  providers: [
    AuthentikProvider({
      clientId: process.env.AUTHENTIK_ID,
      clientSecret: process.env.AUTHENTIK_SECRET,
      issuer: process.env.AUTHENTIK_ISSUER,
      authorization: { params: { scope: 'openid email profile discord' } },
      profile(profile) {
        console.log(profile);
        return {
          id: profile.sub,
          username: profile.name ?? profile.preferred_username,
          discord: profile.discord,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, profile }) {
      const user = {} as UserInterface;
      if (profile?.sub && profile?.preferred_username) {
        user.id = profile.sub;
        user.username = profile.name;

        if (profile?.discord?.id && profile?.discord?.avatar) {
          user.discord = {
            id: profile.discord.id,
            avatar: profile.discord.avatar,
            username: profile.discord.username,
            discriminator: profile.discord.discriminator,
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
