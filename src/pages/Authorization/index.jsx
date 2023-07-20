import { useState } from 'react';
import styles from './Authorization.module.scss';
import Banner from '../../components/Banner';
import LogInGreating from '../../components/LogInGreating';
import SignUpForm from '../../components/SignUpForm';
import LoginForm from '../../components/LoginForm';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';

export function Authorization() {
  const [isLogIn, setIsLogIn] = useState(true)
  const loading = useSelector((state) => state.loading.loading);

  return (
    <div id='main'>
      {!loading ?
        <>
          <Banner
            title='Crypter authorization'
            img='/images/banners/authorization-banner.jpg' />
          <div className={styles.authorization}>
            <div className={styles.authorization__container}>
              <LogInGreating
                type={isLogIn ? 'login' : 'signup'}
                onClickHandler={() => setIsLogIn(!isLogIn)}
                classList={styles.authorization__greating} />
              {isLogIn
                ? <LoginForm />
                : <SignUpForm callback={setIsLogIn} />}
            </div>
          </div>
        </>
        : <Loader />}
    </div>
  );
}
