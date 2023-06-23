import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Modal } from '../../components/Modal/index';
import { modalProps } from '../../components/Modal/modalProps';

export function MainLayout() {
  const modalType = useSelector((state) => state.modal.modal);

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