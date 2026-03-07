import NavBar from "../../components/NavBar";
import ProductCard from "./HomeProductCard";
import Footer from "../../components/Footer";
import Reviews from "./Reviews";
import Banner from "./Banner";
import Brands from "./Brands";
import { Loading } from "../../components/Loading";

import { useProductContext } from "../../contexts/productContext";
import { useEffect, useState } from "react";

const Home = () => {
  const { allCategories } = useProductContext();
  const [featured, setFeatured] = useState();

  const getRandom = () => {
    const randomProducts = [];
    const shirts = allCategories.shirts;
    const knits = allCategories.knits;
    const bottoms = allCategories.bottoms;
    const denim = allCategories.denim;
    const outwear = allCategories.outwear;
    const sweaters = allCategories.sweaters;
    const accessories = allCategories.accessories;
    const footwear = allCategories.footwear;
    const products = [shirts, knits, bottoms, denim, outwear, sweaters, accessories, footwear];

    for (let item of products) {
      if (item.length > 0) {
        const random = Math.floor(Math.random() * item.length);
        randomProducts.push(item[random]);
      }
    }
    setFeatured(randomProducts);
  };

  useEffect(() => {
    if (allCategories) {
      getRandom();
    }
  }, [allCategories]);
  console.log(featured);  
  return (
    <div className="overflow-x-hidden w-full">
      <NavBar />
      <Banner />
      <Brands />
      <div className="home flex w-screen justify-center pt-4 mt-10 bg-lightestBlue">
        {featured ? (
          <div className="home-product-cards sm:w-[90%] flex flex-wrap justify-center flex-row">
            {featured.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
      <Reviews />
      <Footer />
    </div>
  );
};

export default Home;
