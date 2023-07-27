import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../utils/vars';
import { reqGet } from '../utils/requestBody';
import { fetchData } from '../utils';
import { useCallback, useEffect, useState } from 'react';
import { Account, AdminProducts } from '../pages';
import { Navigate } from 'react-router-dom';
import { setErrorAction } from '../redux/actions/errorActions';
import Loader from '../components/Loader';

export default function PrivateRoute({ path }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token) || localStorage.getItem('token');
  const [isAdmin, setIsAdmin] = useState(null);

  const checkPermition = useCallback(async () => {
    if (token) {
      try {
        const user = await fetchData(`${baseUrl}customers/customer`, reqGet())
        setIsAdmin(user?.isAdmin)
      } catch (error) {
        dispatch(setErrorAction(error.message));
      }
    }
  }, [dispatch, token])

  useEffect(() => {
    checkPermition()
  }, [checkPermition])

  switch (path) {
    case 'account':
      return token ? <Account /> : <Navigate to="/authorization" />
    case 'admin':
      if (token) {
        if (isAdmin) return <AdminProducts />
        if (isAdmin === false) return <Navigate to="../not-found" />
      } else {
        return <Navigate to="../not-found" />
      }
    default: return <Loader />
  }
}