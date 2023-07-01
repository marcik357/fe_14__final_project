import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Logo, Search, Basket, LogIn, Account } from '../Icons';
import style from './header.module.scss';
import socialData from '../SocialLink/socialData';
import SocialLink from '../SocialLink';
import menuData from '../MenuLink/menuData';
import MenuLink from '../MenuLink';
import MobilNav from '../MobilNav';

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

  // поточне значення введеного тексту в input та значення placeholder
  const [searchValue, setSearchValue] = useState('');

  function handleInputChange(e) {
    setSearchValue(e.target.value);
  }

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

  // логінізація тимчасова!!!!!
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <header className={style.header}>
        <div className={`${style.header__wrapper} ${scrolled && style.header__scrolled}`}>
          <div className={style.header__container}>
            <div className={style.header__section}>
              <Link to="/">
                <div className={style.header__logo}>
                  <Logo />
                  <span className={style.header__title}>CRYPTER</span>
                </div>
              </Link>
              <div className={`${style.header__search} ${style.search}`}>
                <form action="" className={`${style.search__form} ${isSearchVisible ? style.active : ''} ${scrolled ? style.scrolled : null}`}>
                  <label htmlFor="searchInput" className={style.search__label}>
                    <input
                      id="searchInput"
                      type="text"
                      placeholder="Search"
                      className={style.search__input}
                      value={searchValue}
                      onChange={handleInputChange}
                    />
                    <Search />
                  </label>
                </form>
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
                isActive={isActive('/cart')}
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