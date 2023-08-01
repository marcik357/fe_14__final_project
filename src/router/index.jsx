import { Route, Routes } from 'react-router-dom';
import { MainLayout, Home, Cart, NotFound, Product, Blog, Order, Account, Author, Authorization, Discover, Help, AdminProducts, Collection } from '../pages';
import { useState, createContext } from 'react';
import { PhoneAuthContextProvider } from '../components/PaymentForm/PhoneAuthContext';
import PrivateRouteAdmin from './PrivateRouteAdmin';
import PrivateRouteAccount from './PrivateRouteAccount';
export const Quantity = createContext()

export default function Router() {
  const [orderAmount, setOrderAmount] = useState(0);

  return (
    <PhoneAuthContextProvider>
    <Quantity.Provider value={[orderAmount, setOrderAmount]}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/order" element={<Order />} />
          <Route path="/help" element={<Help />} />

          <Route path='/account' element={<PrivateRouteAccount />} />

          <Route path="/authorization" element={<Authorization />} />
          <Route path="/author/:authorId" element={<Author />} />
          <Route path="/collection/:collectionId" element={<Collection />} />
          <Route path="/product/:productId" element={<Product />} />
        </Route>

        <Route path="*" element={<NotFound />} />

        <Route element={<PrivateRouteAdmin />}>
          <Route path="/admin" element={<AdminProducts />} />
        </Route>

      </Routes>
    </Quantity.Provider>
    </PhoneAuthContextProvider>
  );
}