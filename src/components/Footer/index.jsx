import style from './footer.module.scss'

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footer__container}>
         <div className={footer__section}>
           <Link to="/">
             <div className={style.footer_logo}>
               <Logo />
               <span className={style.footer__title}>CRYPTER</span>
             </div>
           </Link>
           <div className="footer__subtitle">
             Empower your creativity.
           </div>
         </div>
         <nav className={`${style.footer__menu} ${menu}`}>
           <div className={`${style.menu__info}  ${style.info}`}>
             <h3 className={style.info__title}>INFO</h3>
             <ul className={style.info__list}>
                <li className={style.info__item}>
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
                </li>
              </ul>
           </div>
           <div className={`${style.menu__soc} ${style.soc}`}>
             <h3 className={style.soc__title}>SOCIAL</h3>
             <ul className={style.social__list}>
                <li className={style.social__item}>
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
                </li>
              </ul>
           </div>
         </nav>
      </div>
    </footer>
  );
}

export default Footer;