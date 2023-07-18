import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Logo } from '../Icons';
import { useSelector } from 'react-redux';
import style from './footer.module.scss';
import socialData from '../SocialLink/socialData';
import SocialLink from '../SocialLink';
import menuData from '../MenuLink/menuData';
import MenuLink from '../MenuLink';
import { scrollUpPage } from '../../utils';

function Footer() {
  // логінізація
  const isToken = useSelector(state => state.token.token !== null)
  const [isLogin, setIsLogin] = useState(isToken);

  useEffect(() => {
    if (isToken) {
      setIsLogin(true);
   } else {
      setIsLogin(false);
   }
  }, [isToken])

  return (
    <footer className={style.footer}>
      <div className={style.footer__container}>
         <div className={style.footer__section}>
          <Link to="/" className={style.footer__logo} onClick={scrollUpPage}>
              <Logo width={48} height={48} color={'#202025'} />
              <span className={style.footer__title}>CRYPTER</span>
           </Link>
           <div className={style.footer__subtitle}>
             Empower your creativity.
           </div>
         </div>
         <nav className={`${style.footer__menu} ${style.menu}`}>
           <div className={`${style.menu__info}  ${style.info}`}>
             <h3 className={style.info__title}>INFO</h3>
             <ul className={style.info__list}>
                {menuData.map(({type, page, text, icon, classHover}) => (
                  (isLogin && type !== 'login') || (!isLogin && type !== 'account') ? (
                    <MenuLink
                      key={type}
                      classItem={style.info__item}
                      page={page}
                      text={text}
                      isLogin={isLogin}
                  />
                  ) : null
                  ))}
              </ul>
           </div>
           <div className={`${style.menu__soc} ${style.social}`}>
             <h3 className={style.social__title}>SOCIAL</h3>
             <ul className={style.social__list}>
                {socialData.map(({type, url, icon}) => (
                    <SocialLink
                      key={type}
                      classLi={style.social__item}
                      url={url}
                      classUrl={style.social__link}
                      icon={icon('#686A6C')}
                      text={type}
                  />
                  ))}
              </ul>
           </div>
         </nav>
         <div className={style.footer__info}>
           <span>Copyright © 2023 UI8 LLC.</span>
           <span>&nbsp; All rights reserved</span>
         </div>
      </div>
    </footer>
  );
}

export default Footer;