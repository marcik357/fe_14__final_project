import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Loader from '../../components/Loader';
import styles from './Authorization.module.scss';
import Banner from '../../components/Banner';
import SignInForm from '../../components/SignInForm';

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
        <div className={`${styles.authorization__switcher} + ${styles.switcher}`}>
          <button
            onClick={() => setIsLogIn(true)}
            className={isLogIn ? `${styles.switcher__btn} + ${styles.switcher__btn_active}` : styles.switcher__btn}>
            Logn In
          </button>
          <button
            onClick={() => setIsLogIn(false)}
            className={!isLogIn ? `${styles.switcher__btn} + ${styles.switcher__btn_active}` : styles.switcher__btn}>
            Sign In
          </button>
        </div>
        {isLogIn ? <div>login</div> : <SignInForm />}
      </div>
    </>
  );
}
