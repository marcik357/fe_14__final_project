import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDataAction } from '../../redux/actions/getDataActions';
import Loader from '../../components/Loader';
import { AuthorDetails } from '../../components/AuthorDetails';
import { baseUrl } from '../../utils/vars';
import { addPartnersAction } from '../../redux/actions/partnersActions';

export function Author() {
  const { authorId } = useParams();

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);
  const authors = useSelector((state) => state.partners.partners);

  const author = useSelector((state) =>
    state.partners.partners.find((author) => {
      return author.customId === authorId;
    })
  );
  useEffect(() => {
    dispatch(getDataAction(`${baseUrl}partners`, addPartnersAction));
  }, [dispatch]);

  return (
    <>
      {!loading && author ? (
        <AuthorDetails author={author} authorId={authorId} />
      ) : (
        <Loader />
      )}
    </>
  );
}
