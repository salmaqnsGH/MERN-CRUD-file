import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();

  const onLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  useEffect(() => {
    const c = Cookies.get('token');
    if (!c) router.push('/login');
  }, []);

  return (
    <>
      <div className='topnav'>
        <a className='active' type='button' onClick={onLogout}>
          Logout
        </a>
      </div>
    </>
  );
}
