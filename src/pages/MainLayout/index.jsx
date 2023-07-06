import { useEffect } from 'react';
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

export function MainLayout() {
  const dispatch = useDispatch()
  const modalType = useSelector((state) => state.modal.modal);
  const token = useSelector((state) => state.token.token);
  const cart = useSelector((state) => state.cart.cart);
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
      setCart(getDataFromLS('cart'));
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
    if (cart.length === 0) dispatch(createCartFromLS(token, getDataFromLS('cart')));
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
