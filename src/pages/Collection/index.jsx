import style from './collection.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import Banner from '../../components/Banner';
import { CollectionDetails } from '../../components/CollectionDetails';
import { baseUrl } from '../../utils/vars';
import { fetchData, loadData } from '../../utils';

export function Collection() {
  const { collectionId } = useParams();
  const [{ products, productsQuantity }, setProducts] = useState([]);
  const [collection, setCollection] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.loading.loading);
  const error = useSelector(state => state.error.error)

  const collectionLoad = useCallback(async () => {
    const collections = await fetchData(`${baseUrl}catalog`)
    const products = await fetchData(`${baseUrl}products/filter?&categories=${collectionId}`)
    const collection = await collections.find((collection) => collection.name === collectionId)
    setCollection(collection);
    setProducts(products);
  }, [collectionId])

  useEffect(() => {
    loadData(dispatch, collectionLoad)
  }, [dispatch, collectionLoad]);

  useEffect(() => {
    (error || !collection) && navigate("/not-found");
  }, [error, collection, navigate]);

  if (loading) return <Loader />

  return (
    <div id='main'>
      {products &&
        <div className={style.collection}>
          <Banner title={'Collection'} subtitle={collection?.name} img='/images/banners/collection-banner.webp' />
          <div className={style.collection__wrapper}>
            <div className={style.collection__container}>
              <CollectionDetails collection={collection} products={products} productsQuantity={productsQuantity} />
            </div>
          </div>
        </div>}
    </div>
  )
}