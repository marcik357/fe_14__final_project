import { Basket, LogIn, Account } from '../Icons';
import { CartAmount } from '../CartAmount';

const menuData = [
  {
    type: 'Discover',
    page: '/discover',
    text: 'Discover',
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
    page: '/authorization',
    text: 'LogIn',
    icon(width, height, color, strokeWidth) {return <LogIn width={width} height={height} color={color} strokeWidth={strokeWidth}/>},
    classHover: 'loginHover'
   },
  {
    type: 'account',
    page: '/account',
    text: 'Account',
    icon(width, height, color, strokeWidth) {return <Account width={width} height={height} color={color} strokeWidth={strokeWidth}/>},
    classHover: 'accountHover'
 },
  {
    type: 'basket',
    page: '/cart',
    text: 'Shopping cart',
    icon(width, height, color, strokeWidth) {return <><Basket width={width} height={height} color={color} strokeWidth={strokeWidth} /> <CartAmount /></>},
    classHover: 'basketHover'
  },
];

export default menuData;