import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setLogin } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = async () => {
    const data = { email, password };
    console.log("data", data);

    if (!email || !password) {
      toast.error("Email dan password wajib diisi");
    } else {
      const response = await setLogin(data);
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        router.push("/");
      }
    }
  };
  return (
    <>
      <form action="/action_page.php" method="get">
        <label>Email:</label>
        <input type="email" placeholder="Enter your email address" value={email} onChange={(event) => setEmail(event.target.value)} />
        <br />
        <br />
        <label>Password:</label>
        <input type="password" placeholder="Your password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br />
        <br />
        <div>
          <button type="button" onClick={onSubmit}>
            Login
          </button>
          <Link href="/register">
            <a>Register</a>
          </Link>
        </div>
        <ToastContainer />
      </form>
    </>
  );
}
