import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      username: string;
      discord?: {
        id: string;
        avatar: string;
        username: string;
        discriminator: string;
      };
    };
  }

  interface Profile {
    id: string;
    username: string;
    discord: {
      id: string;
      avatar: string;
      username: string;
      discriminator: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: any;
  }
}
