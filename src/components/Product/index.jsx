import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import  ProductDetails  from '../ProductDetails';

function Product() {
  const products = useSelector((state) => state.products.products);
  const { productId } = useParams();

  const product = products.find((item) => item.id === Number(productId));

  return product ? (
      <ProductDetails {...product} key={product.id} />
    ) : (
      <p>Product not found</p>
    );
}

export default Product;