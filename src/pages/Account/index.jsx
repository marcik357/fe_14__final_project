
import styles from './Account.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import Loader from '../../components/Loader';
import { baseUrl } from '../../utils/vars';
import Banner from '../../components/Banner';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { setTokenAction } from '../../redux/actions/tokenActions';
import { setCart } from '../../redux/actions/cartActions';
import OrdersList from '../../components/OrdersList';
import { fetchData, loadData } from '../../utils';
import { reqGet, Navigate } from '../../utils/requestBody';
import AddProductForm from '../../components/AddProductForm';
import { setTokenAction } from '../../redux/actions/tokenActions';
import { setCart } from '../../redux/actions/cartActions';
import OrdersList from '../../components/OrdersList';
import { Mint } from '../../components/Mint';


export function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } =useSelector(state=> state.products);
  const loading = useSelector((state) => state.loading.loading);
  const [mintResult, setMintResult ]=useState('')
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState(null)
  // const [openForm, setOpenForm] = useState(false);
  const [addProduct, setAddProduct] = useState(false)
  const [mint,setMint] = useState(false);
  const [card, setCard]=useState(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    dispatch(setTokenAction(null));
    dispatch(setCart(null));
    // return <Navigate to="/authorization" />;
  }

  const accountLoad = useCallback(async () => {
    const user = await fetchData(`${baseUrl}customers/customer`, reqGet())
    const orders = await fetchData(`${baseUrl}orders`, reqGet())
    setUser(user)
    setOrders(orders)
  }, [])

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
  }, [dispatch, token, mint]);

  useEffect(() => {
    if (isOverlayVisible) {
     document.body.style.overflow = 'hidden';
   } else {
     document.body.style.overflow = 'auto';
   }
 }, [isOverlayVisible]);

  useEffect(()=>{
    setCard(mintResult[Math.floor(Math.random() * mintResult?.length)])
  },[mintResult])

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
                {!addProduct && <button
                  className={styles.user__btn}
                  onClick={handleAddButton}
                  type='button'>
                  Add new product
                </button>}
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
                className={styles.user__btnsItem}
                type='button'
                onClick={()=>{
                  setMintResult(products.filter(product=>product.categories === "mint"))
                  setMint(!mint)}}
                >Mint</button>
               
                {user?.isAdmin
                  && <button
                    className={styles.user__btnsItem}
                    onClick={() => setAdminPanel(!adminPanel)}
                    type='button'>
                    {adminPanel ? 'Show List of orders' : 'Show Admin panel'}
                  </button>
                  }
              </div>
              {mint ?<Mint
              user={user}
              card={card}
              setMint={setMint}
              orders={orders}
              isOverlayVisible={isOverlayVisible}
              setOverlayVisible={setOverlayVisible}
              mint={mint}/> :addProduct
                ? <AddProductForm onCloseForm={handleFormClose} isInAccount={true} />
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