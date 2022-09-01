import Head from 'next/head';
import Navbar from './Navbar';

const Header = () => (
  <>
    <Head>
      <title>Tech Haven</title>
      <meta
        name='description'
        content='Tech Haven - A Safe Space for Nerds to Learn IT'
      />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Navbar />
  </>
);

export default Header;
