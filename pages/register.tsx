import React, { useState } from "react";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { setSignUp } from "../services/auth";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const router = useRouter();

  const onSubmit = async () => {
    const data = { name, email, password, country };

    const result = await setSignUp(data);
    if (result?.error === 1) {
      toast.error(result.message);
    } else {
      toast.success("Register berhasil");
      router.push("/login");
      localStorage.removeItem("user-form"); //remove local storage data
    }
    console.log("regis resp", data);
  };
  return (
    <>
      <h2>Register</h2>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          aria-describedby="name"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <label>Email Address</label>
        <input type="email" placeholder="Enter your email address" value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div>
        <label>Country</label>
        <input
          type="country"
          aria-describedby="country"
          placeholder="Enter your country"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          aria-describedby="password"
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button type="button" onClick={onSubmit}>
          Continue
        </button>
        <Link href="/login">
          <a role="button">Login</a>
        </Link>
      </div>
      <ToastContainer />
    </>
  );
}
