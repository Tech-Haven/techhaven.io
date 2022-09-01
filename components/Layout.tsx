import Footer from './layout/Footer';
import Header from './layout/Header';

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className='container mx-auto mt-4 flex flex-col min-h-screen'>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
