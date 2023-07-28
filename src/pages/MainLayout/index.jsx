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
import { addProductsAction } from '../../redux/actions/productsActions';
import { baseUrl } from '../../utils/vars';
import { setCart } from '../../redux/actions/cartActions';
import { fetchData, getDataFromLS, loadData } from '../../utils';
import { Quantity } from '../../router';
import { reqGet, reqPost } from '../../utils/requestBody';
import BackToTopButton from '../../components/ButtonToTop';

export function MainLayout() {
  const dispatch = useDispatch()
  const modalType = useSelector((state) => state.modal.modal);
  const token = useSelector((state) => state.token.token) || localStorage.getItem('token');
  const error = useSelector((state) => state.error.error);
  const cart = useSelector((state) => state.cart.cart);
  const products = useSelector((state) => state.products.products);
  const [orderAmount, setOrderAmount] = useContext(Quantity)

  const countOrderAmount = useCallback(() => {
    if (cart?.products?.length > 0) {
      const prices = cart?.products?.map(({ cartQuantity, product }) => {
        const productR = products?.find((item) => item._id === product || item._id === product._id)
        return (cartQuantity * productR?.currentPrice)
      })
      setOrderAmount(prices?.reduce((prev, next) => prev + next, 0))
    }
  }, [cart, products, setOrderAmount])

  const migrateCartToServer = useCallback(async () => {
    if (token) {
      const cartLS = await getDataFromLS('cart');
      const cartSR = await fetchData(`${baseUrl}cart`, reqGet(localStorage.getItem('token')))
      if ((!cartSR || cartSR?.products?.length === 0) && cartLS.length > 0) {
        const cart = await fetchData(`${baseUrl}cart`, reqPost(JSON.stringify({ products: cartLS })));
        localStorage.removeItem('cart');
        dispatch(setCart(cart));
      } else {
        dispatch(setCart(cartSR));
      }
    }
  }, [dispatch, token])

  const mainLoad = useCallback(async () => {
    dispatch(setTokenAction(localStorage.getItem('token')));
    const products = await fetchData(`${baseUrl}products`)
    dispatch(addProductsAction(products.filter((product)=>product.enabled)));
    await migrateCartToServer()
  }, [dispatch, migrateCartToServer])

  useEffect(() => {
    loadData(dispatch, mainLoad)
  }, [dispatch, mainLoad])

  useEffect(() => {
    countOrderAmount()
  }, [countOrderAmount])

  useEffect(() => {
    if (error == 401) {
      dispatch(setModalType('login'));
      dispatch(setErrorAction(null));
    }
    modalType
      ? document.body.style.overflow = 'hidden'
      : document.body.style.overflow = 'auto';
  }, [dispatch, error, modalType])


  return (
    <>
      {modalType && (
        <Modal data={modalProps.find((modal) => modal.type === modalType)} />
      )}
      <Header />
      <Outlet />
      <BackToTopButton />
      <Footer />
    </>
  );
}
