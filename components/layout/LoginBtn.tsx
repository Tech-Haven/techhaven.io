import { signIn } from 'next-auth/react';

const LoginBtn = () => (
  <button
    onClick={() => signIn('authentik')}
    className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-200 hover:text-white'
  >
    Sign in
  </button>
);

export default LoginBtn;
