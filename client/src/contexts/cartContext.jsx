import { useContext, createContext, useEffect, useState } from "react";
const cartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : null;
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
};

const useCartContext = () => {
  const context = useContext(cartContext);
  if (context === undefined) {
    throw new Error(
      "useCartContext must be within a CartContextProvider, Make sure that the component is wrapped within a CartContextProvider"
    );
  }
  return context;
};

export { CartContextProvider, useCartContext };
