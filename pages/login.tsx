import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { setLogin } from '../services/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onSubmit = async () => {
    const data = { email, password };

    if (!email || !password) {
      toast.error('Email dan password wajib diisi');
    } else {
      const response = await setLogin(data);
      if (response.error) {
        toast.error(response.message);
      } else {
        const token = response.data.token;
        const tokenBase64 = btoa(token);
        Cookies.set('token', tokenBase64, { expires: 1 });
        toast.success(response.message);
        router.push('/');
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h2 className="card-title text-center">Login</h2>
                <form action='/action_page.php' method='get'>
                  <label class="form-label">Email:</label>
                  <input
                    className="form-control"
                    type='email'
                    placeholder='Enter your email address'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <label class="form-label">Password:</label>
                  <input
                    className="form-control"
                    type='password'
                    placeholder='Your password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <br />
                  <br />
                  <div className="d-grid gap-2">
                    <button type='button'className="btn btn-sm btn-primary btn-block" onClick={onSubmit}>
                      Login
                    </button>
                    <Link href='/register'>
                      <a className="btn btn-sm btn-secondary btn-block">Register</a>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
