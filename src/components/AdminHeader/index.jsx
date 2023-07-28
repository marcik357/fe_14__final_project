import { Link, Navigate } from "react-router-dom"
import style from "./adminHeader.module.scss"
import { Logo } from "../Icons"
import { useDispatch } from "react-redux";
import { setTokenAction } from "../../redux/actions/tokenActions";

export default function AdminHeader({ loggedIn }) {
  const dispatch = useDispatch();

  function logOut() {
    localStorage.removeItem('token');
    dispatch(setTokenAction(null));
    window.location.reload()
    // return <Navigate to="/admin" />;
  }
  return (
    <header className={style.header}>
      <div className={style.header__wrapper}>
        <div className={style.header__container}>
          <Link to="/admin" className={style.header__link}>
            <div className={style.header__logo}>
              <Logo />
              <span className={style.header__title}>CRYPTER</span>
            </div>
          </Link>
          {loggedIn
            && <button
              className={style.header__logOut}
              onClick={logOut}
              type='button'>
              Log out
            </button>}
        </div>
      </div>
    </header>
  )
}