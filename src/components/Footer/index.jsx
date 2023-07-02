import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Logo, Search, Basket, LogIn, Instagram } from '../Icons';
import style from './footer.module.scss';
import socialData from '../SocialLink/socialData';
import SocialLink from '../SocialLink';
import menuData from '../MenuLink/menuData';
import MenuLink from '../MenuLink';

function Footer() {
  // логінізація тимчасова!!!!!
  const [isLogin, setIsLogin] = useState(false);

  return (
    <footer className={style.footer}>
      <div className={style.footer__container}>
         <div className={style.footer__section}>
           <Link to="/" className={style.footer__logo}>
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
                     //  classHover={style[classHover]}
                      page={page}
                     //  isActive={isActive(page)}
                     //  classActive={style.activeLink}
                     //  closeBurgerMenu={() => toggleBurgerMenu()}
                      text={text}
                     //  isDesktop={isDesktop}
                      isLogin={isLogin}
                     //  icon={icon}
                  />
                  ) : null
                  ))}
                {/* <li className={style.info__item}>
                  <Link to="/categories">
                    <span>Store</span>
                  </Link>
                </li>
                <li className={style.info__item}>
                  <Link to="*">
                    <span>Blog</span>
                  </Link>
                </li>
                <li className={style.info__item}>
                  <Link to="*">
                    <span>Help center</span>
                  </Link>
                </li>
                <li className={style.info__item}>
                  <Link to="*">
                    <span>Shopping cart</span>
                  </Link>
                </li> */}
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
                {/* <li className={style.social__item}>
                  <a href="https://www.instagram.com/nft_community/" className={style.social__link} target="_blank" rel="noreferrer">
                    <Instagram color="#010101" />
                  </a>
                </li>
                <li className={style.social__item}>
                  <a href="https://twitter.com/nft__community" className={style.social__link} target="_blank" rel="noreferrer">
                    <Twitter color="#010101" />
                  </a>
                </li>
                <li className={style.social__item}>
                  <a href="https://www.facebook.com/NFTCommunity" className={style.social__link} target="_blank" rel="noreferrer">
                    <Facebook color="#010101" />
                  </a>
                </li>
                <li className={style.social__item}>
                  <a href="https://www.linkedin.com/groups/13992662/" className={style.social__link} target="_blank" rel="noreferrer">
                    <Linkedin color="#010101" />
                  </a>
                </li> */}
              </ul>
           </div>
         </nav>
         <div className={style.footer__info}>
           Copyright © 2022 UI8 LLC. All rights reserved
         </div>
      </div>
    </footer>
  );
}

export default Footer;