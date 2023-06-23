import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { getData } from '../../redux/actions/getDataActions';
import { Modal } from '../../components/Modal/index';
import { modalProps } from '../../components/Modal/modalProps';
export function MainLayout() {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modal.modal);

  useEffect(() => {
    dispatch(getData('./data/productList.json'));
  }, [dispatch]);
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
