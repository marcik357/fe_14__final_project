import styles from './Account.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDataAction } from '../../redux/actions/getDataActions';
import Loader from '../../components/Loader';
import { baseUrl } from '../../utils/vars';
import Banner from '../../components/Banner';
import { useState } from 'react';
import { AdminProducts } from '../../components/AdminProducts';

export function Account() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);
  const token = useSelector((state) => state.token.token);

  const [user, setUser] = useState(null)
  const [adminPanel, setAdminPanel] = useState(false)
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    token && dispatch(getDataAction(`${baseUrl}customers/customer`, setUser, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }, 'account-data'));
    token && dispatch(getDataAction(`${baseUrl}orders`, setOrders, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }, 'account-data'));
  }, [dispatch, token]);

  return (
    <>
      {!loading
        ? user &&
        <>
          <Banner
            title='Hello there!'
            subtitle={`General ${user?.login}`}
            img='/images/banners/account-banner.webp' />
          <div className={styles.user}>
            <div className={styles.user__container}>
              {user?.isAdmin
                && <button
                  className={styles.user__adminBtn}
                  onClick={() => setAdminPanel(!adminPanel)}
                  type='button'>
                  {adminPanel ? 'Show List of orders' : 'Show Admin panel'}
                </button>}
              {!adminPanel
                ? <>
                  <h4 className={styles.orders__title}>List of your orders:</h4>
                  <div className={`${styles.user__orders} ${styles.orders}`}>
                    {orders?.length > 0 && orders?.map((order) => (
                      <div
                        className={styles.orders__wrapper}
                        key={Math.random() * 1000}>
                        <div
                          className={styles.orders__content}>
                          {order?.products.map(({ product, cartQuantity }) => (
                            <div
                              className={styles.orders__item}
                              key={Math.random() * 1000}>
                              <img
                                className={styles.orders__img}
                                src={product.imageUrls}
                                alt={product.name} />
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
                </>
                : <AdminProducts />}
            </div>
          </div>
        </>
        : <Loader />
      }
    </>
  )
}