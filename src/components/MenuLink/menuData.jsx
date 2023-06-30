import { Basket, LogIn, Account } from '../Icons';

const menuData = [
  {
    type: 'store',
    page: '/categories',
    text: 'Store',
  },
  {
    type: 'blog',
    page: '/blog',
    text: 'Blog',
  },
  {
    type: 'help',
    page: '/help',
    text: 'Help center',
  },
  {
    type: 'login',
    page: '/login',
    text: 'login',
    icon: <LogIn width={35} height={35} color={'#202025'} />
   },
  {
    type: 'account',
    page: '/account',
    text: 'account',
    icon: <Account width={35} height={35} color={'#202025'} />
 },
  {
    type: 'basket',
    page: '/cart',
    text: 'Shopping cart',
    icon: <Basket width={35} height={35} color={'#202025'} fill={'none'} />
  },
];

export default menuData;