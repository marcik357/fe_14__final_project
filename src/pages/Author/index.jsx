import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDataAction } from '../../redux/actions/getDataActions';
import Loader from '../../components/Loader';
import { AuthorDetails } from '../../components/AuthorDetails';
import { baseUrl } from '../../utils/vars';

export function Author() {
  const { authorId } = useParams();
  // const [product, setProduct] = useState(null);
  // const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);

  // useEffect(() => {
  //   dispatch(getDataAction(`https://plankton-app-6vr5h.ondigitalocean.app/api/products/${productId}`, setProduct));
  // }, [dispatch, productId]);

  return (
    <>
      {!loading ? (
        <AuthorDetails authorId={authorId}/>
      ) : (
        <Loader />
      )}
    </>)
}