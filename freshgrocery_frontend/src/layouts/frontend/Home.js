import React, {useEffect} from 'react';
import SliderImage from '../../components/sliderImage/SliderImage';
import ProductsCategory from '../../components/productCategory/ProductsCategory';
import AboutProduct from '../../components/aboutProduct/AboutProduct';

const Home = () => {

  useEffect(() => {
    document.title = "Home | Freshgrocery";
  },[]);
  return <div>
    <div>
      <SliderImage />
    </div>
    <div id="products">
      <ProductsCategory />
    </div>
    <div>
      <AboutProduct />
    </div>
  </div>;
}

export default Home;
