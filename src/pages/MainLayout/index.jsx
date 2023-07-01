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

export function MainLayout() {
  const dispatch = useDispatch()
  const modalType = useSelector((state) => state.modal.modal);
  const token = useSelector((state) => state.token.token);
  const error = useSelector((state) => state.error.error);

  useEffect(() => {
    if (error == 401) {
      dispatch(setModalType('login'));
      dispatch(setErrorAction(null));
    }
    if (!token) {
      dispatch(setTokenAction(localStorage.getItem('token')));
    }
    modalType
      ? document.body.style.overflow = 'hidden'
      : document.body.style.overflow = 'auto';
  }, [token, error, modalType, dispatch])

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
