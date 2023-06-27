import style from './loader.module.scss';

function Loader() {
  return (
    <div className={style.three__body}>
      <div className={style.three__bodyDot}></div>
      <div className={style.three__bodyDot}></div>
      <div className={style.three__bodyDot}></div>
    </div>
  );
}

export default Loader;
