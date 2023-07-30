import style from './author.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import Banner from '../../components/Banner';
import { AuthorDetails } from '../../components/AuthorDetails';
import { baseUrl } from '../../utils/vars';
import { useState } from 'react';
import { useCallback } from 'react';
import { fetchData, loadData } from '../../utils';

export function Author() {
  const { authorId } = useParams();
  const [{ products, productsQuantity }, setProducts] = useState([]);
  const [author, setAuthor] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.loading.loading);
  const error = useSelector(state => state.error.error)

  const authorLoad = useCallback(async () => {
    const authors = await fetchData(`${baseUrl}partners`)
    const products = await fetchData(`${baseUrl}products/filter?&author=${authorId}`)
    const author = await authors.find((author) => author.customId === authorId)
    setAuthor(author);
    setProducts(products);
  }, [authorId])

  useEffect(() => {
    loadData(dispatch, authorLoad)
  }, [dispatch, authorLoad]);

  useEffect(() => {
    (error || !author) && navigate("/not-found");
  }, [error, author, navigate]);

  if (loading) return <Loader />

  return (
    <div id='main'>
      {Object.keys(author).length > 0 && (
        <div className={style.author}>
          <Banner title={author.name} img='/images/banners/author-banner.webp' />
          <div className={style.author__wrapper}>
            <div className={style.author__container}>
              {products?.length > 0
                ? <AuthorDetails author={author} products={products} productsQuantity={productsQuantity} />
                : <p className = {style.author__text}>Sorry, but at this moment we don't have any NFT's of this author</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
