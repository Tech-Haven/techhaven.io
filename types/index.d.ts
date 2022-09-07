declare module 'myTypes' {
  interface UserInterface {
    id: string;
    username: string;
    discord: DiscordUserType;
  }

  type DiscordUserType = {
    id: string;
    avatar: string;
    username: string;
    discriminator: string;
  };

  export type AvatarType = string;

  interface UserStateProps {
    user: UserInterface;
    avatar: AvatarType;
  }
}
