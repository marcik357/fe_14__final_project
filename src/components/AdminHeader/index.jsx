import { Link, Navigate  } from "react-router-dom"
import style from "./adminHeader.module.scss"
import { Logo } from "../Icons"
import { useDispatch } from "react-redux";
import { setTokenAction } from "../../redux/actions/tokenActions";

export default function AdminHeader () {
  const dispatch = useDispatch();
    
    function logOut() {
        localStorage.removeItem('token');
        dispatch(setTokenAction(null));
        return <Navigate to="/admin" />;
      }
    return (
        <header className={style.header}>
            <div className={style.wrapper}>
        <div className={style.container}>
        <div className={style.section}>
        <Link to="/admin">
                <div className={style.logo}>
                  <Logo />
                  <span className={style.title}>CRYPTER</span>
                </div>
              </Link>
              </div>
              <button
              className={style.logOut}
              onClick={logOut}
              type='button'>
              Log out
            </button>
        </div>
        </div>
        </header>
    )
}