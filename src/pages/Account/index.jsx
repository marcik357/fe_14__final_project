
import styles from './Account.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import Loader from '../../components/Loader';
import { baseUrl } from '../../utils/vars';
import Banner from '../../components/Banner';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { setTokenAction } from '../../redux/actions/tokenActions';
import { setCart } from '../../redux/actions/cartActions';
import OrdersList from '../../components/OrdersList';
import { fetchData, loadData } from '../../utils';
import { reqGet } from '../../utils/requestBody';
import AddProductForm from '../../components/AddProductForm';

export function Account() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);

  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState(null)
  // const [openForm, setOpenForm] = useState(false);
  const [addProduct, setAddProduct] = useState(false)

  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    dispatch(setTokenAction(null));
    dispatch(setCart(null));
    return <Navigate to="/authorization" />;
  }

  const accountLoad = useCallback(async () => {
    const user = await fetchData(`${baseUrl}customers/customer`, reqGet())
    const orders = await fetchData(`${baseUrl}orders`, reqGet())
    setUser(user)
    setOrders(orders)
  }, [])

  useEffect(() => {
    loadData(dispatch, accountLoad)
  }, [dispatch, accountLoad]);

  if (loading) return <Loader />

  function handleAddButton() {
    setAddProduct(true)
  }
  function handleFormClose() {
  
    setAddProduct(false)
  }

  return (
    <div id='main'>
      {user &&
        <>
      <Banner
        title='Hello there!'
        subtitle={`General ${user?.login || ''}`}
        img='/images/banners/account-banner.webp' />
      <div className={styles.user}>
        <div className={styles.user__container}>
          <div className={styles.user__btns}>
          {!addProduct && <button
                  className={styles.user__btnsItem}
                  onClick={handleAddButton}
                  type='button'>
                  Add new product
                </button>}
                <button
              className={styles.user__btnsItem}
              onClick={logOut}
              type='button'>
              Log out
            </button>
            {/* {user?.isAdmin &&
              <Link
                className={styles.user__btnsItem}
                to={'/admin'}>
                Show Admin panel
              </Link>} */}
          </div>
          {addProduct ?
          <AddProductForm onCloseForm={handleFormClose} isInAccount={true}/>
                  : <>
          <h4 className={styles.user__title}>List of your orders:</h4>
          {orders?.length > 0
            ? <OrdersList orders={orders} />
            : <p className={styles.user__empty}>you still haven't bought anything...</p>}</>}
        </div>
      </div>
      </>}
    </div>
  )
}