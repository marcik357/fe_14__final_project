import styles from './Account.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import Loader from '../../components/Loader';
import { baseUrl } from '../../utils/vars';
import Banner from '../../components/Banner';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setTokenAction } from '../../redux/actions/tokenActions';
import { setCart } from '../../redux/actions/cartActions';
import OrdersList from '../../components/OrdersList';
import { fetchData, loadData } from '../../utils';
import { reqGet } from '../../utils/requestBody';
import AddProductForm from '../../components/AddProductForm';
import { Mint } from '../../components/Mint';

export function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loading.loading);
  const [mintArray, setMintArray] = useState(null)
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState(null)
  const [addProduct, setAddProduct] = useState(false)
  const [mint, setMint] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    dispatch(setTokenAction(null));
    dispatch(setCart(null));
  }

  const accountLoad = useCallback(async () => {
    const user = await fetchData(`${baseUrl}customers/customer`, reqGet());
    const orders = await fetchData(`${baseUrl}orders`, reqGet());
    const products = await fetchData(`${baseUrl}products`);
    setUser(user)
    setOrders(orders)
    setMintArray(products.filter(item => item.categories === "mint"))
  }, [])

  useEffect(() => {
    loadData(dispatch, accountLoad)
  }, [dispatch, accountLoad]);

  useEffect(() => {
    isOverlayVisible
      ? document.body.style.overflow = 'hidden'
      : document.body.style.overflow = 'auto'
  }, [isOverlayVisible]);

  if (loading) return <Loader />

  return (
    <div id='main'>
      {user &&
        <>
          <Banner
            title='Hello there!'
            subtitle={`General ${user?.login || 'Kenobi'}`}
            img='/images/banners/account-banner.webp' />
          <div className={styles.user}>
            <div className={styles.user__container}>
              <div className={styles.user__buttons}>
                <button
                  className={styles.user__btn}
                  onClick={() => {
                    navigate("/authorization");
                    const timer = setTimeout(() => {
                      logOut();
                      clearTimeout(timer)
                    }, 10)
                  }}
                  type='button'>
                  Log out
                </button>
                <button
                  className={styles.user__btn}
                  onClick={() => {
                    setAddProduct(!addProduct);
                    setMint(false);
                  }}
                  type='button'>
                  {!addProduct ? 'Add new product' : 'Orders list'}
                </button>
                <button
                  className={styles.user__btn}
                  type='button'
                  onClick={() => {
                    setAddProduct(false);
                    setMint(!mint);
                  }}>
                  {mint ? 'Orders list' : 'Mint'}
                </button>
              </div>
              {mint
                ? <Mint
                  user={user}
                  mintArray={mintArray}
                  orders={orders}
                  isOverlayVisible={isOverlayVisible}
                  setOverlayVisible={setOverlayVisible} />
                : addProduct
                  ? <AddProductForm onCloseForm={() => setAddProduct(false)} isInAccount={true} />
                  : <>
                    <h4 className={styles.user__title}>List of your orders:</h4>
                    {orders?.length > 0
                      ? <OrdersList orders={orders} />
                      : <p className={styles.user__empty}>you still haven't bought anything...</p>}
                  </>}
            </div>
          </div>
        </>}
    </div>
  )
}
