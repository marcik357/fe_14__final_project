import styles from './Account.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { getDataAction } from '../../redux/actions/getDataActions';
import Loader from '../../components/Loader';
import { baseUrl } from '../../utils/vars';
import Banner from '../../components/Banner';
import { useState } from 'react';
import { AdminProducts } from '../../components/AdminProducts';
import { Link, Navigate } from 'react-router-dom';
import { setTokenAction } from '../../redux/actions/tokenActions';
import { setCart } from '../../redux/actions/cartActions';
import OrdersList from '../../components/OrdersList';
import { async } from 'q';
import { fetchData } from '../../utils';
import { setLoadingAction } from '../../redux/actions/loadingActions';
import { setErrorAction } from '../../redux/actions/errorActions';

export function Account() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);
  const token = useSelector((state) => state.token.token);

  const [user, setUser] = useState(null)
  const [adminPanel, setAdminPanel] = useState(false)
  const [orders, setOrders] = useState(null)

  async function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    await dispatch(setTokenAction(null));
    await dispatch(setCart(null));
    return <Navigate to="/authorization" />;
  }

  const accountLoad = useCallback(async () => {
    try {
      if (token) {
        dispatch(setLoadingAction(true));
        const user = await fetchData(`${baseUrl}customers/customer`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        })
        await setUser(user)
        const orders = await fetchData(`${baseUrl}orders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        })
        await setOrders(orders)
        dispatch(setLoadingAction(false))
      }
    } catch (error) {
      dispatch(setLoadingAction(false))
      dispatch(setErrorAction(error.message));
    }
  }, [dispatch, token])

  useEffect(() => {
    accountLoad()
  }, [accountLoad]);

  return (
    <div id='main'>
      {!loading
        ? <>
          <Banner
            title='Hello there!'
            subtitle={`General ${user?.login || ''}`}
            img='/images/banners/account-banner.webp' />
          <div className={styles.user}>
            <div className={styles.user__container}>
              <div className={styles.user__btns}>
                <button
                  className={styles.user__btnsItem}
                  onClick={logOut}
                  type='button'>
                  Log out
                </button>
                {user?.isAdmin
                  && <button
                    className={styles.user__btnsItem}
                    onClick={() => setAdminPanel(!adminPanel)}
                    type='button'>
                    {adminPanel ? 'Show List of orders' : 'Show Admin panel'}
                  </button>}
              </div>
              {!adminPanel
                ? <>
                  <h4 className={styles.user__title}>List of your orders:</h4>
                  {orders?.length > 0 && <OrdersList orders={orders}/>}
                </>
                : <AdminProducts />}
            </div>
          </div>
        </>
        : <Loader />
      }
    </div>
  )
}