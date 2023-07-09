import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Logo } from '../Icons';
import { useSelector } from 'react-redux';
import style from './header.module.scss';
import socialData from '../SocialLink/socialData';
import SocialLink from '../SocialLink';
import menuData from '../MenuLink/menuData';
import MenuLink from '../MenuLink';
import MobilNav from '../MobilNav';
import { HeaderSearch } from '../HeaderSearch';

function Header() {
  // зміна розмірів та прозорості хедера при прокрутці
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
  }, []);

  // відкриття бургер-меню
  const [isOpen, setIsOpen] = useState(false);

  function toggleBurgerMenu() {
    setIsOpen(!isOpen);
  }

  // прапор для компонентів, щоб не рендерити іх на десктопі
  const isDesktop = useMediaQuery({ minWidth: 993 });

  // показуємо та ховаємо радок пошуку input
  const [isSearchVisible, setSearchVisible] = useState(false);

  function toggleSearchView() {
    setSearchVisible(!isSearchVisible);
  }

  // відміна прокрутки при відкритому бургер меню
  useEffect(() => {
    if (!isDesktop && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isDesktop, isOpen]);

  // підсвічення пункту меню відповідно до сторінки на якій знаходиться користувач
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  // скрол (тільки на Home Page) на початок сторінки
  const scrollUpPage = () => {
    if(location.pathname === '/') {
      window.scrollTo({ top: 0, behavor: 'smooth'});
	 }
  };

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
    <>
      <header className={style.header}>
        <div className={`${style.header__wrapper} ${scrolled && style.header__scrolled}`}>
          <div className={style.header__container}>
            <div className={style.header__section}>
              <Link to="/" onClick={scrollUpPage}>
                <div className={style.header__logo}>
                  <Logo />
                  <span className={style.header__title}>CRYPTER</span>
                </div>
              </Link>
              <div className={`${style.header__search} ${style.search}`}>
                <HeaderSearch
                  classForm={style.search__form}
                  isSearchVisible={isSearchVisible}
                  classActive={style.active}
                  scrolled={scrolled}
                  classScrolled={style.scrolled}
                  classLabel={style.search__label}
                  classInput={style.search__input}
                  classClear={style.search__clear}
                  classClearActive={style.active}
                  toggleSearchView={toggleSearchView}
                />
              </div>
            </div>
            <nav className={`${style.nav} ${isOpen ? style.active : ''}`}>
              <div className={style.social}>
                <h2 className={style.social__title}>
                  <span>Join our</span>
                  <br />
                  <span>community</span>
                </h2>
                <ul className={style.social__list}>
                  {socialData.map(({type, url, icon}) => (
                    <SocialLink
                      key={type}
                      classLi={style.social__item}
                      url={url}
                      classUrl={style.social__link}
                      icon={icon('#010101')}
                  />
                  ))}
                </ul>
              </div>
              <ul className={style.nav__list}>
                {menuData.map(({type, page, text, icon, classHover}) => (
                  (isLogin && type !== 'login') || (!isLogin && type !== 'account') ? (
                    <MenuLink
                      key={type}
                      classItem={style.nav__item}
                      classHover={style[classHover]}
                      page={page}
                      isActive={isActive(page)}
                      classActive={style.activeLink}
                      closeBurgerMenu={() => toggleBurgerMenu()}
                      text={text}
                      isDesktop={isDesktop}
                      isLogin={isLogin}
                      icon={icon}
                  />
                  ) : null
                  ))}
              </ul>
            </nav>
            <>
              <MobilNav
                toggleSearchView={() => toggleSearchView()}
                isLogin={isLogin}
                isActive={isActive}
                isOpen={isOpen}
                toggleBurgerMenu={() => toggleBurgerMenu()}
              />
            </>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;