import Main from '../components/Main';
import { NextPage } from 'next';
import Navbar from '../components/Navbar';

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Main />
    </>
  );
};

export default Home;
