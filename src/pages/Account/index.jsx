import styles from './Account.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
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
import { Mint } from '../../components/Mint';


export function Account() {
  const dispatch = useDispatch();
  const { products } =useSelector(state=> state.products);
  const loading = useSelector((state) => state.loading.loading);
  const token = useSelector((state) => state.token.token);
  const [mintResult, setMintResult ]=useState('')
  const [user, setUser] = useState(null)
  const [adminPanel, setAdminPanel] = useState(false)
  const [orders, setOrders] = useState(null)
  const [mint,setMint] = useState(false);
  const [card, setCard]=useState(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  async function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    await dispatch(setTokenAction(null));
    await dispatch(setCart(null));
    return <Navigate to="/authorization" />;
  }
  
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
      {!loading
        ? user &&
        <>
          <Banner
            title='Hello there!'
            subtitle={`General ${user?.login}`}
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
              mint={mint}/> :!adminPanel
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