import styles from './banner.module.scss';

export default function Banner({title, subtitle, img}) {

  return (
    <div className={styles.banner}>
      <img className={styles.banner__img} src={img} alt={title} />
      <h2 className={styles.banner__title}>
        {title}
      </h2>
      <h3 className={styles.banner__subtitle}>
        {subtitle}
      </h3>
    </div>
  );
}