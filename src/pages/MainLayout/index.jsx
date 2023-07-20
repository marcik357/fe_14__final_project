import { useEffect, useContext, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Modal } from '../../components/Modal/index';
import { modalProps } from '../../components/Modal/modalProps';
import { setTokenAction } from '../../redux/actions/tokenActions';
import { setModalType } from '../../redux/actions/modalActions';
import { setErrorAction } from '../../redux/actions/errorActions';
import { getDataAction } from '../../redux/actions/getDataActions';
import { addProductsAction } from '../../redux/actions/productsActions';
import { baseUrl, reqGet } from '../../utils/vars';
import { createCartFromLS, setCart } from '../../redux/actions/cartActions';
import { fetchData, getDataFromLS } from '../../utils';
import { Quantity } from '../../router';
import { setLoadingAction } from '../../redux/actions/loadingActions';

export function MainLayout() {
  const dispatch = useDispatch()
  const modalType = useSelector((state) => state.modal.modal);
  const token = useSelector((state) => state.token.token) || localStorage.getItem('token');
  const cart = useSelector((state) => state.cart.cart);
  const error = useSelector((state) => state.error.error);
  const products = useSelector((state) => state.products.products);
  const [orderAmount, setOrderAmount] = useContext(Quantity)

  const mainLoad = useCallback(async () => {
    try {
      dispatch(setLoadingAction(true));
      dispatch(setTokenAction(localStorage.getItem('token')));
      const products = await fetchData(`${baseUrl}products`)
      dispatch(addProductsAction(products));
      if (!token) {
        setCart(getDataFromLS('cart'));
      } else {
        const cart = await fetchData(`${baseUrl}cart`, reqGet)
        dispatch(setCart(cart));
      }
      dispatch(setLoadingAction(false))
    } catch (error) {
      dispatch(setLoadingAction(false))
      dispatch(setErrorAction(error.message));
    }
  }, [dispatch, token])

  useEffect(() => {
    mainLoad()
  }, [mainLoad])

  useEffect(() => {
    if (error == 401) {
      dispatch(setModalType('login'));
      dispatch(setErrorAction(null));
    }
    modalType
      ? document.body.style.overflow = 'hidden'
      : document.body.style.overflow = 'auto';
  }, [dispatch, error, modalType])
  // }, [token, error, modalType, dispatch])

  useEffect(() => {
    if (cart.length === 0 && getDataFromLS('cart').length > 0) {
      dispatch(createCartFromLS(getDataFromLS('cart')));
      localStorage.removeItem('cart');
    };
  }, [cart, token, dispatch])

  useEffect(() => {
    if (token) {
      const prices = cart?.products?.map(({ cartQuantity, product }) => {
        return (cartQuantity * product?.currentPrice)
      })
      setOrderAmount(prices?.reduce((prev, next) => prev + next, 0))
    } else {
      if (products.length > 0) {
        const prices = cart?.products?.map(({ cartQuantity, product }) => {
          const productR = products?.find((item) => item._id === product)
          return (cartQuantity * productR?.currentPrice)
        })
        setOrderAmount(prices?.reduce((prev, next) => prev + next, 0))
      }
    }
  }, [cart, products, token, setOrderAmount])
  
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
