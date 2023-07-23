import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDataAction } from '../redux/actions/getDataActions';
import { baseUrl } from '../utils/vars';
import { AdminProducts } from '../pages';
import { Arrow } from '../components/Icons';
import { AdminLogin } from "../components/AdminLogin"
import { NotAuthorizedAdmin } from '../components/NotAuthorizedAdmin';

export default function PrivateRouteAdmin() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token) || localStorage.getItem('token');
  const [user, setUser] = useState(null)

  useEffect(() => {
    token && dispatch(getDataAction(`${baseUrl}customers/customer`, setUser, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }, 'account-data'));
  }, [dispatch, token]);

if (user?.isAdmin) {
    return <AdminProducts />;
  } else if (token) {
    return <NotAuthorizedAdmin/>
  } else {
    return <AdminLogin/>
  }
//   }
}