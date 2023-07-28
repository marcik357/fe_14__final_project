import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAction } from '../redux/actions/getDataActions';
import { baseUrl } from '../utils/vars';
import { AdminProducts, NotFound } from '../pages';
import { AdminLogin } from "../components/AdminLogin"
import Loader from '../components/Loader';
import { reqGet } from '../utils/requestBody';
import { NotAuthorizedAdmin } from '../components/NotAuthorizedAdmin';

export default function PrivateRouteAdmin() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token) || localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [userDataFetched, setUserDataFetched] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(getDataAction(`${baseUrl}customers/customer`, setUser, reqGet(token), 'account-data'))
      .then(() => setIsTokenValid(true))
      .catch(() => setIsTokenValid(false))
      .finally(() => {
        setIsLoading(false);
        setUserDataFetched(true);
      });
    } else {
      setIsTokenValid(false);
      setIsLoading(false);
      setUserDataFetched(true);
    }
  }, [dispatch, token]);

  if (isLoading) {
    return <Loader />;
  }

  if (!userDataFetched) {
    return <Loader />;
  }

  if (!token || !isTokenValid) {
    return <AdminLogin />;
  }

  if (!isTokenValid) {
    return <NotFound />;
  }

  if (user?.isAdmin) {
    return <AdminProducts />;
  }

  return <NotAuthorizedAdmin />;
}
