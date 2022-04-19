import React from 'react';
import MultiItemCarousel from '../components/layout/Carousel/MultiItemCarousel';
import Categories from '../components/layout/Categories/Categories';
import Collections from '../components/layout/Collections/Collections';
import Slider from '../components/layout/Slider/Slider';
import ReactHelmet from '../components/Seo/ReactHelmet';
//import Discounts from "../components/layout/Discounts/Discounts";
// import Informative1 from "../components/layout/Informative1/Informative1";
// import NewsLetter from "../components/layout/NewsLetter/NewsLetter";
//import MultiItemCarousel2 from "../components/layout/Carousel/MultiItemCarousel2";

const Home = () => {
  return (
    <div>
      <ReactHelmet title={'Home'} />
      <Slider />
      <Collections />
      <MultiItemCarousel />
      <Categories />
      {/*<Discounts />*/}
      {/*<MultiItemCarousel />*/}
      {/*<MultiItemCarousel2 />}
      {/*<MultiItemCarousel />*/}
      {/*<Informative1 />*/}
      {/*<NewsLetter />*/}
      {/*<Products />
       */}
    </div>
  );
};

export default Home;
