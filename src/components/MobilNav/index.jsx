import { NavLink } from 'react-router-dom';
import { Search, Basket, LogIn, Account } from '../Icons';
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
         <NavLink to='/login' className={style.mobilNav__login}>
           <LogIn width={30} height={30} color={'#202025'} />
         </NavLink>
         ) : (
         <NavLink to='/accaunt' className={style.mobilNav__account}>
           <Account width={30} height={30} color={'#202025'} />
         </NavLink>
         )}
         <NavLink to='/cart' className={style.mobilNav__basket}>
           <Basket width={30} height={30} color={'#202025'} fill={isActive ? '#686A6C' : 'none'} />
         </NavLink>
        <button type="button" className={`${style.mobilNav__burger} ${isOpen ? style.active : ''}`} onClick={toggleBurgerMenu}> </button>
      </div>
    </>
  );
}

export default MobilNav;