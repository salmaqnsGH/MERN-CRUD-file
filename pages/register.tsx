import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { setSignUp } from '../services/auth';
import { getCountry } from '../services/member';

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');

  const getCountryAPI = useCallback(async () => {
    const data = await getCountry();

    setCountries(data);
    setCountry(data[0]);
  }, [getCountry]);

  useEffect(() => {
    getCountryAPI();
  }, []);

  const onSubmit = async () => {
    const data = { name, email, password, country };

    const result = await setSignUp(data);
    if (result.error) {
      console.log(result)
      toast.error(result.message);
    } else {
      toast.success('Register berhasil');
      router.push('/login');
      localStorage.removeItem('user-form'); //remove local storage data
    }
  };
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h2 className="card-title text-center">Register</h2>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type='text'
                    className="form-control"
                    aria-describedby='name'
                    placeholder='Enter your name'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type='email'
                    className="form-control"
                    placeholder='Enter your email address'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Country</label>
                  <select className="form-select" value={country} onChange={(event) => setCountry(event.target.value)}>
                    {countries.map((countryName) => {
                      return (
                        <option key={countryName} value={countryName}>
                          {countryName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type='password'
                    className="form-control"
                    aria-describedby='password'
                    placeholder='Your password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type='button' className="btn btn-sm btn-primary btn-block" onClick={onSubmit}>
                    Submit
                  </button>
                  <Link href='/login'>
                    <a type='button' className="btn btn-sm btn-secondary btn-block">Login</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
  );
}
