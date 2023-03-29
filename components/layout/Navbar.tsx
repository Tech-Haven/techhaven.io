import { Fragment, useState, useEffect, DOMAttributes } from 'react';
import Image from 'next/image';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { signOut, useSession } from 'next-auth/react';
import logo from '../../public/tech_haven_icon.png';
import defaultAvatar from '../../public/default_avatar.jpg';
import LoginBtn from './LoginBtn';
import Link from 'next/link';

type UserMenuProps = {
  avatar: string | null;
  username?: string;
};

interface UserNavigation {
  name: string;
  href?: string;
  target?: string;
  onClick?: DOMAttributes<HTMLAnchorElement>['onClick'];
}

const navigation = [
  { name: 'Forums', href: 'https://forums.techhaven.io/', current: false },
  { name: 'Discord', href: 'https://discord.gg/5kG6kp2zA8', current: false },
];

const userNavigation: UserNavigation[] = [
  { name: 'Dashboard', href: '/dashboard' },
  {
    name: 'Account Management',
    href: 'https://login.techhaven.io/if/user/#/settings',
    target: '_blank',
  },
  { name: 'Sign out', onClick: () => signOut() },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const { data: session } = useSession();

  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (session) {
      setUsername(session.user.username);
    }

    if (session?.user.discord) {
      setAvatar(
        `https://cdn.discordapp.com/avatars/${session.user.discord.id}/${session.user.discord.avatar}`
      );
    }
  }, [session]);

  return (
    <Disclosure as='nav' className='bg-navbar shadow'>
      {({ open }) => (
        <>
          <div className='container mx-auto'>
            <div className='flex h-16 items-center justify-between'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <Link href='/' passHref>
                    <Image
                      className='hover:cursor-pointer'
                      width='48px'
                      height='48px'
                      src={logo}
                      alt='logo'
                    />
                  </Link>
                </div>
                <div className='hidden md:block'>
                  <div className='ml-10 flex items-baseline space-x-4'>
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-200 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className='hidden md:block'>
                <div className='ml-4 flex items-center md:ml-6'>
                  {/* Profile dropdown */}
                  {session ? <UserMenu avatar={avatar} /> : <LoginBtn />}
                </div>
              </div>
              <div className='-mr-2 flex md:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md bg-navbar p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='md:hidden'>
            <div className='space-y-1 px-2 pt-2 pb-3 sm:px-3'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-200 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            {session ? (
              <UserMenuMobile avatar={avatar} username={username} />
            ) : (
              <div className='border-t border-gray-700'>
                <LoginBtn />
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const UserMenu = ({ avatar }: UserMenuProps) => (
  <Menu as='div' className='relative ml-3'>
    <div>
      <Menu.Button className='flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
        <span className='sr-only'>Open user menu</span>
        <Image
          className='rounded-full'
          width='48px'
          height='48px'
          src={avatar ? avatar : defaultAvatar}
          alt=''
        />
      </Menu.Button>
    </div>
    <Transition
      as={Fragment}
      enter='transition ease-out duration-100'
      enterFrom='transform opacity-0 scale-95'
      enterTo='transform opacity-100 scale-100'
      leave='transition ease-in duration-75'
      leaveFrom='transform opacity-100 scale-100'
      leaveTo='transform opacity-0 scale-95'
    >
      <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-navbar py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
        <p>{}</p>
        {userNavigation.map((item) => (
          <Menu.Item key={item.name}>
            <a
              href={item.href}
              onClick={item.onClick}
              target={item.target}
              className={
                'block cursor-pointer px-4 py-2 text-sm text-gray-400 hover:text-white'
              }
            >
              {item.name}
            </a>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Transition>
  </Menu>
);

const UserMenuMobile = ({ avatar, username }: UserMenuProps) => (
  <div className='border-t border-gray-700 pt-4 pb-3'>
    <div className='flex items-center px-5'>
      <div className='flex-shrink-0'>
        <Image
          className='rounded-full'
          width='48px'
          height='48px'
          src={avatar ? avatar : defaultAvatar}
          alt=''
        />
      </div>
      <div className='ml-3'>
        <div className='text-base font-medium leading-none text-white'>
          {username}
        </div>
      </div>
    </div>
    <div className='mt-3 space-y-1 px-2'>
      {userNavigation.map((item) => (
        <Disclosure.Button
          key={item.name}
          as='a'
          href={item.href}
          onClick={item.onClick}
          target={item.target}
          className='block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:text-white'
        >
          {item.name}
        </Disclosure.Button>
      ))}
    </div>
  </div>
);

export default Navbar;
