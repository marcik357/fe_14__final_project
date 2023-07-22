import style from './collection.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getDataAction } from '../../redux/actions/getDataActions';
import Loader from '../../components/Loader';
import Banner from '../../components/Banner';
import { CollectionDetails } from '../../CollectionDetails';
import { baseUrl } from '../../utils/vars';

export function Collection() {
	const { collectionId } = useParams();
	const [{ products, productsQuantity }, setProducts] = useState([]);
	const [collection, setCollection] = useState({});
	const dispatch = useDispatch();
 
	const loading = useSelector((state) => state.loading.loading);

	const getCollection = useCallback((data) => {
		const collection = data.find((collection) => collection.name === collectionId);
		setCollection(collection)
	 }, [collectionId])

	 useEffect(() => {
		dispatch(getDataAction(`${baseUrl}catalog`, getCollection, {}, 'collectoin'));
		dispatch(getDataAction(`${baseUrl}products/filter?&categories=${collectionId}`, setProducts, {}, 'products'));
	 }, [dispatch, getCollection, setProducts, collectionId]);

return(
	!loading && products ? (
      <div className={style.collection}>
        <Banner title={'Collection'} subtitle={collection?.name} img='/images/banners/collection-banner.png' />
        <div className={style.collection__wrapper}>
          <div className={style.collection__container}>
            <CollectionDetails collection={collection} products={products} productsQuantity={productsQuantity} />
          </div>
        </div>
      </div>
    ) : (
      <Loader />
    )
  )
}