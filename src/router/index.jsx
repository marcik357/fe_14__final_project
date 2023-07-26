import { Route, Routes } from 'react-router-dom';
import { MainLayout, Home, Cart, NotFound, Product, Blog, Order, Account, Author, Authorization, Discover, Help, AdminProducts, Collection } from '../pages';
import PrivateRoute from './PrivateRoute';
import { useState, createContext } from 'react';
export const Quantity = createContext()

export default function Router() {
  const [orderAmount, setOrderAmount] = useState(0);

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
          {/* <Route element={<PrivateRoute />}>
            <Route path='/account' element={<Account />} />
          </Route> */}

          <Route path='/account' element={<PrivateRoute path='account' />} />
          <Route path='/admin' element={<PrivateRoute path='admin' />} />
          {/* <Route path='/account' element={<PrivateRoute />} />
          <Route path='/admin' element={<PrivateRoute adminPanel={true} />} /> */}

          {/* <Route element={<PrivateRoute adminPanel={true} />}>
            <Route path='/admin' element={<AdminProducts />} />
          </Route> */}
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/author/:authorId" element={<Author />} />
          <Route path="/collection/:collectionId" element={<Collection />} />
          <Route path="/product/:productId" element={<Product />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Quantity.Provider>
  );
}