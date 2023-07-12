import style from './author.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDataAction } from '../../redux/actions/getDataActions';
import Loader from '../../components/Loader';
import Banner from '../../components/Banner';
import { AuthorDetails } from '../../components/AuthorDetails';
import { baseUrl } from '../../utils/vars';
import { useState } from 'react';
import { useCallback } from 'react';

export function Author() {
  const { authorId } = useParams();
  const [{ products, productsQuantity }, setProducts] = useState([]);
  const [author, setAuthor] = useState({});
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loading.loading);

  const getAuthor = useCallback((data) => {
    const author = data.find((author) => author.customId === authorId);
    setAuthor(author)
  }, [authorId])

  useEffect(() => {
    dispatch(getDataAction(`${baseUrl}partners`, getAuthor, {}, 'author'));
    dispatch(getDataAction(`${baseUrl}products/filter?&author=${authorId}`, setProducts, {}, 'products'));
  }, [dispatch, getAuthor, setProducts, authorId]);

  return (
    !loading && products ? (
      <div className={style.author}>
        <Banner title={author.name} img='/images/banners/author-banner.png' />
        <div className={style.author__container}>
          <AuthorDetails author={author} products={products} productsQuantity={productsQuantity} />
        </div>
      </div>
    ) : (
      <Loader />
    )
  )
}
