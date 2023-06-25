import {
  Route, Routes,
} from 'react-router-dom';
import {
  MainLayout, Home, Cart, Categories, NotFound, ProductPage,
} from '../pages';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<ProductPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}