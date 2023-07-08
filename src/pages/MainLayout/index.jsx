import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Modal } from '../../components/Modal/index';
import { modalProps } from '../../components/Modal/modalProps';
import { setTokenAction } from '../../redux/actions/tokenActions';
import { reloadPageSV,setCart,getDataLS} from '../../redux/actions/cartActions';
import { getDataAction } from '../../redux/actions/getDataActions';
import { addProductsAction } from '../../redux/actions/productsActions';
import { parseLocalStorageItem } from '../../components/Cart/LocalStorage';
import { baseUrl } from '../../utils/vars';
import { setModalType } from '../../redux/actions/modalActions';

export function MainLayout() {
  const dispatch = useDispatch()
  const modalType = useSelector((state) => state.modal.modal);
  const cart = useSelector(state => state.cart);
  const { token } = useSelector(state => state.token);
  const { products } = useSelector(state => state.products);
  const error = useSelector((state) => state.error.error);
  useEffect(() => {
    if (error == 401) {
      dispatch(setModalType('login'));
      dispatch(setErrorAction(null));
    }
    modalType
      ? document.body.style.overflow = 'hidden'
      : document.body.style.overflow = 'auto';
  }, [token, error, modalType, dispatch])

  useEffect(() => {
    dispatch(getDataAction(`${baseUrl}products`, addProductsAction));
    if (!token) {
      dispatch(setTokenAction(localStorage.getItem('token')));
      dispatch(setCart(parseLocalStorageItem('cart')))
      localStorage.setItem('cart',JSON.stringify(cart))
    } else {
      dispatch(reloadPageSV(token));
    }
  }, [dispatch, token])

  useEffect(() => {
    if (cart.length === 0) dispatch(getDataLS(token, parseLocalStorageItem('cart')));
  }, [cart, token, dispatch])

  // useEffect(()=>{

  //   // if(token){
  //   //   if(parseLocalStorageItem('cart').length > 0 && (serverCart(token,baseUrl) === null))
  //   //   dispatch(getDataLS(token,parseLocalStorageItem('cart')))
  //   //   // localStorage.setItem('cart','[]')
  //   // }
  // }
  // ,[dispatch,cart,token])

  return (
    <>
      {modalType && (
        <Modal data={modalProps.find((modal) => modal.type === modalType)} />
      )}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
