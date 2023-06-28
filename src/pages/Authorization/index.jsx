import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Loader from '../../components/Loader';
// import styles from './Authorization.module.scss';
import Banner from '../../components/Banner';
import SignInForm from '../../components/SignInForm';

export function Authorization() {
  const dispatch = useDispatch();

  // const loading = useSelector((state) => state.loading.loading);
  // const error = useSelector((state) => state.error.error);

  useEffect(() => {

  }, [dispatch]);

  return (
    <>
      <Banner
        title='Crypter authorization'
        subtitle="Let's get to know each other better"
        img='/images/banners/authorization-banner.jpg' />
      <SignInForm/>
    </>
  );
}
