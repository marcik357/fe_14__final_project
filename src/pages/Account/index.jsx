import styles from './Account.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDataAction } from '../../redux/actions/getDataActions';
import Loader from '../../components/Loader';
import { baseUrl } from '../../utils/vars';
import Banner from '../../components/Banner';
import { useState } from 'react';
// import { AdminProducts } from '../AdminProducts';
import { Link } from 'react-router-dom';

export function Account() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);
  const token = useSelector((state) => state.token.token);

  const [user, setUser] = useState(null)
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

  // console.log(user);
  console.log(orders);

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
                && <Link
                  className={styles.user__adminBtn}
                  to={'/admin'}>
                  Admin panel
                </Link>}

              <div className={`${styles.user__orders} ${styles.orders}`}>
                <h4 className={styles.orders__title}>List of your orders:</h4>
                {orders?.length > 0 && orders?.map((order) => (
                  <div
                    className={styles.orders__wrapper}
                    key={Math.random() * 1000}>
                    <div
                      className={styles.orders__content}>
                      {order?.products.map(({ product }) => (
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
                          <p
                            className={styles.orders__price}>
                            <span>Price:</span>
                            <span>{product.currentPrice}</span>
                          </p>
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
            </div>
          </div>
        </>
        : <Loader />
      }
    </>
    // {user &&
    //   <>
    //     <Banner
    //       title='Hello there!'
    //       subtitle={`General ${user?.login}`}
    //       img='/images/banners/account-banner.webp' />
    //     {user?.isAdmin && <Link to={'/admin'}>Admin panel</Link>}
    //     {/* {user?.isAdmin
    //       ? <AdminProducts />
    //       : <h4>List of your orders:</h4>} */}
    //     <h4>List of your orders:</h4>
    //   </>
    // }

    // !loading && user
    //   ? <>{user &&
    //     <>
    //       <Banner
    //         title='Hello there!'
    //         subtitle={`General ${user?.login}`}
    //         img='/images/banners/account-banner.webp' />
    //       {user?.isAdmin && <Link to={'/admin'}>Admin</Link>}
    //       {/* {user?.isAdmin
    //         ? <AdminProducts />
    //         : <h4>List of your orders:</h4>} */}
    //       <h4>List of your orders:</h4>
    //     </>
    //   }</>
    //  : <Loader />
  )
}