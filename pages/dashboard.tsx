import type { GetServerSidePropsContext, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';
import ProfileCard from '../components/layout/ProfileCard';
import { useEffect, useState } from 'react';

const Dashboard: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);
  if (!session) router.push('/');

  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }

    if (session?.user?.discord) {
      setAvatar(
        `https://cdn.discordapp.com/avatars/${session.user.discord.id}/${session.user.discord.avatar}`
      );
    }
  }, [session]);

  return (
    <section className='bg-body'>
      <div className='mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-100'>
          Dashboard
        </h1>
        <ProfileCard avatar={avatar} user={user} />
      </div>
    </section>
  );
};

export default Dashboard;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
