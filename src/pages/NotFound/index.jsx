import { NavLink } from 'react-router-dom';
import style from './notFound.module.scss';

export function NotFound() {
  return (
    <>
      <div className={style.notFound}>
        <div className={style.notFound__container}>
          <h1 className={style.notFound__container_title}>404</h1>
          <h2 className={style.notFound__container_subtitle}>Oops, this page not found!</h2>
          <p className={style.notFound__container_info}>The link might be corrupted.</p>
          <p className={style.notFound__container_subinfo}>or the page may have been removed</p>
          <div className={style.notFound__buttons}>
            <NavLink to={-1} className={style.notFound__btn}>
              Previous page
            </NavLink>
            <NavLink to="/" className={style.notFound__btn}>
              Go to home
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}