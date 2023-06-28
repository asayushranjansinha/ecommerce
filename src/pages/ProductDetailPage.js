import React from "react";
import Navbar from "../features/nav/Navbar";
import ProductDetail from "../features/product/components/ProductDetail";
const ProductDetailPage = () => {
  return (
    <Navbar>
      <ProductDetail />
    </Navbar>
  );
};

export default ProductDetailPage;
