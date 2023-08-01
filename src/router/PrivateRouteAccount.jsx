import { useSelector } from 'react-redux';
import { Account, Authorization } from '../pages';

export default function PrivateRouteAccount() {
  const token = useSelector((state) => state.token.token) || localStorage.getItem('token');

  if (token) return <Account />

  return <Authorization />
}