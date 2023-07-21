import styles from './Account.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import Loader from '../../components/Loader';
import { baseUrl } from '../../utils/vars';
import Banner from '../../components/Banner';
import { useState } from 'react';
import { AdminProducts } from '../../components/AdminProducts';
import { Navigate } from 'react-router-dom';
import { setTokenAction } from '../../redux/actions/tokenActions';
import { setCart } from '../../redux/actions/cartActions';
import OrdersList from '../../components/OrdersList';
import { fetchData, loadData } from '../../utils';
import { reqGet } from '../../utils/requestBody';

export function Account() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);
  const token = useSelector((state) => state.token.token);

  const [user, setUser] = useState(null)
  const [adminPanel, setAdminPanel] = useState(false)
  const [orders, setOrders] = useState(null)

  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    dispatch(setTokenAction(null));
    dispatch(setCart(null));
    return <Navigate to="/authorization" />;
  }

  const accountLoad = useCallback(async () => {
    if (token) {
      const user = await fetchData(`${baseUrl}customers/customer`, reqGet())
      const orders = await fetchData(`${baseUrl}orders`, reqGet())
      setUser(user)
      setOrders(orders)
    }
  }, [token])
  
  useEffect(() => {
    loadData(dispatch, accountLoad)
  }, [dispatch, accountLoad]);

  if (loading) return <Loader />

  return (
    <div id='main'>
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
              {orders?.length > 0
                ? <OrdersList orders={orders} />
                : <p className={styles.user__empty}>you still haven't bought anything...</p>}
            </>
            : <AdminProducts />}
        </div>
      </div>
    </div>
  )
}