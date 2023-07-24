import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetails from '../../components/ProductDetails';
import { getDataAction } from '../../redux/actions/getDataActions';
import Loader from '../../components/Loader';
import { baseUrl } from '../../utils/vars';

export function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const loading = useSelector((state) => state.loading.loading);
  const error = useSelector(state => state.error.error)

  useEffect(() => {
    dispatch(getDataAction(`${baseUrl}products/${productId}`, setProduct, {}, 'product'));
  }, [dispatch, productId]);

  useEffect(() => {
    error && navigate("/not-found");
  }, [error, navigate]);

  if (loading) return <Loader />

  return (
    <div id='main'>
      <ProductDetails {...product} />
    </div>)
}