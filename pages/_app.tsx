import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../styles/navbar.css';
import '../styles/main.css';
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
      return (      
      <>
        <Head>
        {/* Bootstrap css */}
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>

        </Head>
        <Component {...pageProps} />
        <ToastContainer />
      </>
      );
}

export default MyApp;
