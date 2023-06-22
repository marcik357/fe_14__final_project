import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { getData } from '../../redux/actions/getDataActions';

export function MainLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData('./data/productList.json'));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
