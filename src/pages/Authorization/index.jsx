import { useState } from 'react';
import styles from './Authorization.module.scss';
import Banner from '../../components/Banner';
import LogInGreating from '../../components/LogInGreating';
import SignUpForm from '../../components/SignUpForm';
import LoginForm from '../../components/LoginForm';
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';

export function Authorization() {
  const [isLogIn, setIsLogIn] = useState(true)
  const loading = useSelector((state) => state.loading.loading);

  if (loading) return <Loader />

  return (
    <div id='main'>
      <Banner
        title='Crypter authorization'
        img='/images/banners/authorization-banner.webp' />
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
    </div>
  );
}
