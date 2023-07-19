import { Link } from 'react-router-dom';
import styles from './OrdersList.module.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function OrdersList({orders}) {

  return (
    <div className={styles.orders}>
      {orders?.length > 0 && orders?.map((order) => (
        <div
          className={styles.orders__wrapper}
          key={order._id}>
          <div
            className={styles.orders__content}>
            {order?.products.map(({ product, cartQuantity }) => (
              <div
                className={styles.orders__item}
                key={product._id}>
                <Link
                  to={`/product/${product.itemNo}`}
                  className={styles.orders__link}>
                  <LazyLoadImage
                    className={styles.orders__img}
                    src={product.imageUrls}
                    effect="blur"
                    alt={product.name} />
                </Link>
                <div className={styles.orders__about}>
                  <p className={styles.orders__name}>
                    {product.name}
                  </p>
                  <p className={styles.orders__details}>
                    {product.details}
                  </p>
                </div>
                <div className={styles.orders__amount}>
                  <p className={styles.orders__quantity}>
                    <span>Quantity: </span>
                    <span>{cartQuantity}</span>
                  </p>
                  <p className={styles.orders__price}>
                    <span>Price:</span>
                    <span>{Number(product.currentPrice?.toFixed(2))}</span>
                  </p>
                  <p className={styles.orders__price}>
                    <span>Total price:</span>
                    <span>{Number((cartQuantity * product.currentPrice).toFixed(2))}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.orders__info}>
            <span>Total price:</span>
            <span>{order.totalSum.toFixed(2)} ETH</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersList;