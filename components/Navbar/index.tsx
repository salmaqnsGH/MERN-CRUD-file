import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();

  const onLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  return (
    <>
      <div className='topnav'>
        <button className='active' type='button' onClick={onLogout}>
          Logout
        </button>
      </div>
    </>
  );
}
