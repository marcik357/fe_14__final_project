import { Route, Routes } from 'react-router-dom';
import { MainLayout, Home, Cart, NotFound, Product, Blog, Order, Account, Author, Authorization, Discover, Help, AdminProducts, AdminLogin } from '../pages';
import PrivateRoute from './PrivateRoute';
import { Provider, useSelector } from 'react-redux';
import { useState, createContext } from 'react';
import PrivateRouteAdmin from './PrivateRouteAdmin';
export const Quantity = createContext()

export default function Router() {
  const [orderAmount, setOrderAmount] = useState(0);
  const token = useSelector((state) => state.token.token);

  return (
    <Quantity.Provider value={[orderAmount, setOrderAmount]}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/order" element={<Order />} />
          <Route path="/help" element={<Help />} />

          <Route element={<PrivateRoute />}>
            <Route path='/account' element={<Account />} />
          </Route>

          <Route path="/authorization" element={<Authorization />} />
          <Route path="/author/:authorId" element={<Author />} />
          <Route path="/product/:productId" element={<Product />} />
        </Route>

        <Route path="*" element={<NotFound />} />

        <Route element={<PrivateRouteAdmin/>}>
        <Route path="/admin" element={<AdminProducts />} />
        </Route>
        {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
        {/* <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/products" element={<PrivateRouteAdmin><AdminProducts/></PrivateRouteAdmin>}/> */}
      </Routes>
    </Quantity.Provider>
  );
}