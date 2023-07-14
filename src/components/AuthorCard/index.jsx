import { Link } from 'react-router-dom';
import AuthorNumber from '../Icons/authorNumber';
import style from './authorCard.module.scss';

function AuthorCard({ index, name, imageUrl, products, customId }) {
  const author = products.find((product) => product.author === customId);

  return (
    <Link to={`/author/${customId}`} className={style.authorCard}>
      <div className={style.authorCard__number}>
        <AuthorNumber className={style.authorCard__number_svg} />
        <span>{index}</span>
      </div>
      <img className={style.authorCard__image} src={imageUrl} alt={name} />
      <p className={style.authorCard__name}>@{name}</p>
    </Link>
  );
}

export default AuthorCard;
