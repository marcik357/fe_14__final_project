import AuthorCard from '../AuthorCard';
import style from './authorList.module.scss';
function AuthorList({ partners, products }) {
  return (
    <div className={style.authorList}>
      <div className={style.authorList__title}>
        <h2>Authors</h2>
      </div>
      <div className={style.authorList__wrapper}>
        {partners?.map((partner, index) => (
          <AuthorCard
            key={partner._id}
            {...partner}
            products={products}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
export default AuthorList;
