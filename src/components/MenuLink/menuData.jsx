import { Basket, LogIn, Account } from '../Icons';

const menuData = [
  {
    type: 'store',
    page: '/categories',
    text: 'Store',
    classHover: 'storeHover'
  },
  {
    type: 'blog',
    page: '/blog',
    text: 'Blog',
    classHover: 'blogHover'
  },
  {
    type: 'help',
    page: '/help',
    text: 'Help center',
    classHover: 'helpHover'
  },
  {
    type: 'login',
    page: '/login',
    text: 'login',
    icon: <LogIn width={35} height={35} color={'#202025'} />,
    classHover: 'loginHover'
   },
  {
    type: 'account',
    page: '/account',
    text: 'account',
    icon: <Account width={35} height={35} color={'#202025'} />,
    classHover: 'accountHover'
 },
  {
    type: 'basket',
    page: '/cart',
    text: 'Shopping cart',
    icon: <Basket width={35} height={35} color={'#202025'} fill={'none'} />,
    classHover: 'basketHover'
  },
];

export default menuData;