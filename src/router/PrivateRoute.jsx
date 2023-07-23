import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ adminPanel }) {
  const token = useSelector((state) => state.token.token) || localStorage.getItem('token');
  const isAdmin = useSelector((state) => state.admin.admin);

  if (!token) return <Navigate to="/authorization" replace />

  if (adminPanel && !isAdmin) return <Navigate to="/account" replace />

  return <Outlet />
}