import styles from './banner.module.scss';

export default function Banner({ title, subtitle, img }) {

  return (
    <div className={styles.banner}>
      <img className={styles.banner__img} src={img} alt={title} />
      {title && <div className={styles.banner__container}>
        <h2 className={styles.banner__title}>
          {title}
        </h2>
        {subtitle && <h3 className={styles.banner__subtitle}>
          {subtitle}
        </h3>}
      </div>}
    </div>
  );
}