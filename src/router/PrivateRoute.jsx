import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getDataAction } from '../redux/actions/getDataActions';
import { baseUrl } from '../utils/vars';
import Loader from '../components/Loader';
import { getDataFromLS } from '../utils';

export default function PrivateRoute({ adminPanel }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);
  const token = useSelector((state) => state.token.token) || getDataFromLS('token');

  // const [isAdmin, setIsAdmin] = useState(false);

  // function recognizeUser(data) {
  //   data?.isAdmin && setIsAdmin(data.isAdmin)
  // }

  // useEffect(() => {
  //   // console.log(token);
  //   adminPanel && dispatch(getDataAction(`${baseUrl}customers/customer`, recognizeUser, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json'
  //     },
  //   }, 'account-data'));
  // }, [dispatch, token, adminPanel]);


  // if (adminPanel) {
  //   return (
  //     isAdmin ? <Outlet /> : <Navigate to="/authorization" />
  //   )
  // }
  // console.log(isAdmin);
  // console.log(token);
  // return (
  //   token ? <Outlet /> : <Navigate to="/authorization" />
  // )
  return (
    <>
      {token ? <Outlet /> : <Navigate to="/authorization" />}
      {/* {!loading
        ? token ? <Outlet /> : <Navigate to="/authorization" />
        : <Loader />
      } */}
    </>
  )
}