import Image from 'next/image';
import { DiscordUserType, UserStateProps } from 'myTypes';
import { FC } from 'react';
import Card from './Card';
import defaultAvatar from '../../public/default_avatar.jpg';

interface DiscordButtonProps {
  discord: DiscordUserType;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const ProfileCard: FC<UserStateProps> = ({ user, avatar }) => (
  <Card>
    <>
      <h2 className='pb-4'>TH Account</h2>
      <Image
        className='rounded-full w-24 h-24'
        src={avatar ? avatar : defaultAvatar}
        width={64}
        height={64}
        alt='profile picture'
      />
      <h5 className='mb-1 text-xl font-medium text-white'>{user.username}</h5>
      <span className='text-sm text-gray-400'>{user.id}</span>
      <div className='flex flex-col text-center mt-4 md:mt-6'>
        <h5 className='mb-1 text-xl font-medium text-white'>
          Linked Accounts:
        </h5>
        <DiscordLinkedButton discord={user.discord} />
      </div>
    </>
  </Card>
);

const DiscordLinkedButton = ({ discord }: DiscordButtonProps) => (
  <a
    href={
      discord
        ? '#'
        : 'https://login.techhaven.io/if/user/#/settings;%7B%22page%22%3A%22page-sources%22%7D'
    }
    className={classNames(
      discord
        ? 'opacity-40 cursor-default'
        : 'hover:bg-blue-700 focus:ring-blue-800 focus:ring-4 focus:outline-none',
      'inline-flex justify-center items-center py-2 px-4 text-sm font-medium text-center text-white rounded-lg  bg-blue-600 '
    )}
  >
    {discord ? <IsLinked discord={discord} /> : <IsNotLinked />}
  </a>
);

const IsNotLinked = () => (
  <>
    Link Discord{' '}
    <svg
      width='24'
      height='24'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      className='ml-2'
    >
      <path d='M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z' />
    </svg>
  </>
);

const IsLinked = ({ discord }: DiscordButtonProps) => (
  <>
    Linked with {discord.username}#{discord.discriminator}
    <svg
      width='24'
      height='24'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      className='ml-2'
    >
      <path d='M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z' />
    </svg>
  </>
);

export default ProfileCard;
