import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Modal } from '../../components/Modal/index';
import { modalProps } from '../../components/Modal/modalProps';

export function MainLayout() {
  const modalType = useSelector((state) => state.modal.modal);

  useEffect(() => {
    modalType
      ? document.body.style.overflow = 'hidden'
      : document.body.style.overflow = 'auto';
  }, [modalType]);

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
