import { NavLink } from 'react-router-dom';
import { Search, Basket, LogIn, Account } from '../Icons';
import { CartAmount } from '../CartAmount';
import style from './mobilNav.module.scss';

function MobilNav(props) {
  const { toggleSearchView, isLogin, isActive, isOpen, toggleBurgerMenu } = props;

  return (
    <>
      <div className={style.mobilNav}>
         <button type="button" className={style.mobilNav__search} onClick={toggleSearchView}>
            <Search width={30} height={30} color="#202025" />
         </button>
         {!isLogin ? (
         <NavLink to='/authorization' className={style.mobilNav__login}>
           <LogIn width={30} height={30} color={'#202025'} strokeWidth={isActive('/authorization') ? '2.2' : '1.5'} />
         </NavLink>
         ) : (
         <NavLink to='/account' className={style.mobilNav__account} >
           <Account width={30} height={30} color={'#202025'} strokeWidth={isActive('/account') ? '2.2' : '1.5'} />
         </NavLink>
         )}
         <NavLink to='/cart' className={style.mobilNav__basket}>
           <Basket width={30} height={30} color={'#202025'} strokeWidth={isActive('/cart') ? '2.2' : '1.5'} /> <CartAmount />
         </NavLink>
        <button type="button" className={`${style.mobilNav__burger} ${isOpen ? style.active : ''}`} onClick={toggleBurgerMenu}> </button>
      </div>
    </>
  );
}

export default MobilNav;