import React from "react";
import Navbar from "../features/nav/Navbar";
import ProductList from "../features/product/components/ProductList";
const Home = () => {
  return (
    <Navbar>
      <ProductList />
    </Navbar>
  );
};

export default Home;
