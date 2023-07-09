import style from './authorCard.module.scss';
function AuthorCard({ index, name, imageUrl }) {
  return (
    <>
      <div className={style.authorCard}>
        <div className={style.authorCard__number}>
          <span>{index}</span>
        </div>
        <img className={style.authorCard__image} src={imageUrl} alt='' />
        <p className={style.authorCard__name}>@{name}</p>
      </div>
    </>
  );
}
export default AuthorCard;
