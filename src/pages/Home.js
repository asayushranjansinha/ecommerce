import React from "react";
import Navbar from "../features/nav/Navbar";
import ProductList from "../features/product/components/ProductList";
import Footer from "../features/shared/Footer";
const Home = () => {
  return (
    <>
      <Navbar>
        <ProductList />
      </Navbar>
      <Footer />
    </>
  );
};

export default Home;
