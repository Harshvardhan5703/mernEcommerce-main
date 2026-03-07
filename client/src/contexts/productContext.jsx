import { useContext, createContext, useState, useEffect } from "react";

const productContext = createContext();

const ProductContextProvider = (props) => {
  const [products, setProducts] = useState("");
  const [category, setCategory] = useState();
  const [allCategories, setAllCategories] = useState();
  const URL = import.meta.env.VITE_URL;

  const exmpCat = {
    shirts: [],
    knits: [],
    bottoms: [],
    denim: [],
    outwear: [],
    sweaters: [],
    accessories: [],
    footwear: [],
  };

  const filterProducts = (data) => {
    exmpCat.shirts = data.filter((product) => product.category === "shirts");
    exmpCat.knits = data.filter((product) => product.category === "knits");
    exmpCat.bottoms = data.filter((product) => product.category === "bottoms");
    exmpCat.denim = data.filter((product) => product.category === "denim");
    exmpCat.outwear = data.filter((product) => product.category === "outwear");
    exmpCat.sweaters = data.filter(
      (product) => product.category === "sweaters"
    );
    exmpCat.accessories = data.filter(
      (product) => product.category === "accessories"
    );
    exmpCat.footwear = data.filter(
      (product) => product.category === "footwear"
    );
    setAllCategories(exmpCat);
  };

  // const fetchImages = (data) => {
  //   data.map((product) => {
  //     const { images } = product;
  //     images[0] = `${URL}/product/${images[0]}`;
  //     images[1] = `${URL}/product/${images[1]}`;
  //   });
  // };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`${URL}/product/getData`);
        const data = await response.json();
        filterProducts(data);

        setProducts(data);
        setCategory();
      } catch (err) {
        // console.log(err);
      }
    };
    fetchProductData();
  }, []);

  return (
    <productContext.Provider
      value={{
        products,
        setProducts,
        category,
        setCategory,
        allCategories,
        setAllCategories,
      }}
    >
      {props.children}
    </productContext.Provider>
  );
};

const useProductContext = () => {
  const context = useContext(productContext);
  if (context === undefined) {
    throw new Error(
      "useProductContext must be within a ProductContextProvider. Make sure the component is wrapped in ProductContextProvider"
    );
  }
  return context;
};

export { ProductContextProvider, useProductContext };
