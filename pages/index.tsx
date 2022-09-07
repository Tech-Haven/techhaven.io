import type { NextPage } from 'next';
import Image from 'next/image';
import logo from '../public/tech_haven_icon.png';

const Home: NextPage = () => (
  <section>
    <div className='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
      <div className='lg:mr-auto place-self-center lg:col-span-7'>
        <h1 className='max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl'>
          Tech Haven
        </h1>
        <p className='max-w-2xl mb-6 font-light text-gray-100 lg:mb-8 md:text-lg lg:text-xl'>
          A safe space for nerds to learn IT
        </p>
        <a
          href='https://forums.techhaven.io/c/resources/5'
          className='inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-gray-100 border border-gray-300 rounded-lg  hover:border-gray-200 focus:ring-4 focus:ring-gray-200 '
        >
          Find Resources
        </a>
        <a
          href='https://discord.gg/5kG6kp2zA8'
          className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-100 bg-orange-600 border border-orange-600 rounded-lg hover:bg-orange-500 hover:border-orange-500 focus:ring-4 focus:ring-gray-200'
        >
          Visit Discord
        </a>
      </div>
      <div className='lg:mt-0 place-self-center lg:col-span-5 lg:flex'>
        <Image src={logo} alt='mockup' />
      </div>
    </div>
  </section>
);

export default Home;
