import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetails from '../../components/ProductDetails';
import Loader from '../../components/Loader';
import { baseUrl } from '../../utils/vars';
import { useCallback } from 'react';
import { fetchData, loadData } from '../../utils';

export function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const loading = useSelector((state) => state.loading.loading);
  const error = useSelector(state => state.error.error)

  const productLoad = useCallback(async () => {
    const product = await fetchData(`${baseUrl}products/${productId}`)
    setProduct(product);
  }, [productId, setProduct])

  useEffect(() => {
    loadData(dispatch, productLoad)
  }, [dispatch, productLoad]);

  useEffect(() => {
    error && navigate("/not-found");
  }, [error, navigate]);

  if (loading) return <Loader />

  return (
    <div id='main'>
      <ProductDetails {...product} />
    </div>)
}