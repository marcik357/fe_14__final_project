import { useEffect, useContext } from 'react';
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
import { baseUrl } from '../../utils/vars';
import { createCartFromLS, setCart } from '../../redux/actions/cartActions';
import { getDataFromLS } from '../../utils';
import { Quantity } from '../../router';

export function MainLayout() {
  const dispatch = useDispatch()
  const modalType = useSelector((state) => state.modal.modal);
  const token = useSelector((state) => state.token.token);
  const cart = useSelector((state) => state.cart.cart);
  const error = useSelector((state) => state.error.error);
  const products = useSelector((state) => state.products.products);
  const [orderAmount, setOrderAmount] = useContext(Quantity)

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
    console.log(token);
    if (!token) {
      dispatch(setTokenAction(localStorage.getItem('token')));
      dispatch(setCart({ products: getDataFromLS('cart') }));
      // dispatch(setCart(getDataFromLS('cart')));
    } else {
      dispatch(getDataAction(`${baseUrl}cart`, setCart, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }));
    }
  }, [dispatch, token])

  useEffect(() => {
    if (token) {
      const prices = cart?.products?.map(({ cartQuantity, product }) => {
        return (cartQuantity * product.currentPrice)
      })
      setOrderAmount(prices?.reduce((prev, next) => prev + next, 0))
    } else {
      if (products.length > 0) {
        const prices = cart?.products?.map(({ cartQuantity, product }) => {
          const productR = products?.find((item) => item._id === product)
          return (cartQuantity * productR.currentPrice)
        })
        setOrderAmount(prices?.reduce((prev, next) => prev + next, 0))
      }
    }
  }, [cart, products, token, setOrderAmount])

  useEffect(() => {
    try {
      if (token && cart?.products?.length === 0 || Array.isArray(cart)) {
        // console.log(cart?.products);
        // console.log(token);
        console.log('111111111');
        dispatch(createCartFromLS(token, "PUT", getDataFromLS('cart')))
      } else if (token && cart === null) {
        console.log('222222222');
        dispatch(createCartFromLS(token, "POST", getDataFromLS('cart')))
      };
    } catch (error) {
      console.log(error);
      return
    }
  }, [cart, token, dispatch])

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
