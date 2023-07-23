import { useState } from 'react';
import styles from './Authorization.module.scss';
import Banner from '../../components/Banner';
import LogInGreating from '../../components/LogInGreating';
import SignUpForm from '../../components/SignUpForm';
import LoginForm from '../../components/LoginForm';

export function Authorization() {
  const [isLogIn, setIsLogIn] = useState(true)

  return (
    <>
      <Banner
        title='Crypter authorization'
        img='/images/banners/authorization-banner.jpg' />
      <div className={styles.authorization}>
        <LogInGreating
          type={isLogIn ? 'login' : 'signup'}
          onClickHandler={() => setIsLogIn(!isLogIn)}
          classList={styles.authorization__greating} />
        {isLogIn
          ? <LoginForm redirectUrl= "/"/>
          : <SignUpForm callback={setIsLogIn} />}
      </div>
    </>
  );
}
