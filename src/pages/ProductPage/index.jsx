import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../../components/ProductDetails';
import { getDataAction } from '../../redux/actions/getDataActions';
import { fetchData } from '../../utils';

export function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDataAction(`https://plankton-app-6vr5h.ondigitalocean.app/api/products/${productId}`, setProduct));
  }, [dispatch, productId]);

  return product ? (
    <ProductDetails {...product} />
  ) : (
    <p>Product not found</p>
  );
}