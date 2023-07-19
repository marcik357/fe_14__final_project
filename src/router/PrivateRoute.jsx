import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const token = useSelector((state) => state.token.token) || localStorage.getItem('token');

  return (
    token
      ? <Outlet />
      : <Navigate to="/authorization" />
  )
}