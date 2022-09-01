import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import logo from '../../public/tech_haven_icon.png';

const navigation = [
  { name: 'Forums', href: 'https://forums.techhaven.io/', current: false },
  { name: 'Discord', href: 'https://discord.gg/5kG6kp2zA8', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => (
  <Disclosure as='nav' className='bg-navbar shadow'>
    {({ open }) => (
      <>
        <div className='container mx-auto'>
          <div className='flex h-16 items-center justify-between'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <Image width='48px' height='48px' src={logo} alt='logo' />
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
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
);

export default Navbar;
