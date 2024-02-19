import React from 'react';
import MenuBar from '../components/MenuBar';
import Carousel from '../components/Carousel';
import Banner from '../components/Banner';
const Home: React.FC = () => {
  return (
    <>
      <MenuBar />
      <Banner />
      <Carousel />
    </>
  );
};

export default Home;
