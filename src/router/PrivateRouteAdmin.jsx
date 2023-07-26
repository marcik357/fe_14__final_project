import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAction } from '../redux/actions/getDataActions';
import { baseUrl } from '../utils/vars';
import { AdminProducts, NotFound } from '../pages';
import { AdminLogin } from "../components/AdminLogin"
import Loader from '../components/Loader';

export default function PrivateRouteAdmin() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token) || localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      dispatch(getDataAction(`${baseUrl}customers/customer`, setUser, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }, 'account-data'))
      .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [dispatch, token]);

  if (isLoading) {
    return <Loader/>;
  }

  if (user?.isAdmin) {
    return <AdminProducts />;
  } else if (token) {
    return <NotFound />;
  } else {
    return <AdminLogin />;
  }
}