import { Link } from 'react-router-dom';
import style from './pageNotFound.module.scss';

export default function PageNotFound(){
    return (
        <>
            <div className={style.notFound}>
                <div className={style.notFound__container}>
                    <h1 className={style.notFound__container_title}>404</h1>
                    <h2 className={style.notFound__container_subtitle}>Oops, this page not found!</h2>
                    <p className={style.notFound__container_info}>The link might be corrupted.</p>
                    <p className={style.notFound__container_subinfo}>or the page may have been removed</p>
                    <Link to="/">
                    <button className={style.notFound__btn}>Go back home</button>
                    </Link>
                </div>
            </div>
        </>
    );
}