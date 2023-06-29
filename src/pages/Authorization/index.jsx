import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Loader from '../../components/Loader';
import styles from './Authorization.module.scss';
import Banner from '../../components/Banner';
import SignUpForm from '../../components/SignUpForm';
import LogInGreating from '../../components/LogInGreating';

export function Authorization() {
  // const dispatch = useDispatch();

  const [isLogIn, setIsLogIn] = useState(true)

  // const loading = useSelector((state) => state.loading.loading);
  // const error = useSelector((state) => state.error.error);

  // useEffect(() => {

  // }, [dispatch]);

  return (
    <>
      <Banner
        title='Crypter authorization'
        // subtitle="Let's get to know each other better"
        img='/images/banners/authorization-banner.jpg' />
      <div className={styles.authorization}>
        <LogInGreating
          type={isLogIn ? 'login' : 'signup'}
          onClickHandler={() => setIsLogIn(!isLogIn)}
          classList={styles.authorization__greating} />
        {isLogIn ? <div>login</div> : <SignUpForm />}
      </div>
    </>
  );
}
