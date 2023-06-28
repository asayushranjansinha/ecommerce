import React from 'react'
import Navbar from '../features/nav/Navbar'
import ProductDetail from '../features/product-list/components/ProductDetail'

const ProductDetailPage = () => {
  return (
    <Navbar>
        <ProductDetail></ProductDetail>
    </Navbar>
  )
}

export default ProductDetailPage