import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Modal } from '../../components/Modal/index';
import { modalProps } from '../../components/Modal/modalProps';
import { setTokenAction } from '../../redux/actions/tokenActions';

export function MainLayout() {
  const dispatch = useDispatch()
  const modalType = useSelector((state) => state.modal.modal);

  useEffect(() => {
    dispatch(setTokenAction(localStorage.getItem('token')));
    modalType
      ? document.body.style.overflow = 'hidden'
      : document.body.style.overflow = 'auto';
  }, [modalType, dispatch]);

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
