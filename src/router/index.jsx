import { Route, Routes } from 'react-router-dom';
import { MainLayout, Home, Cart, NotFound, Product, Blog, Order, Author, Authorization, Discover, Help, AdminProducts } from '../pages';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/order" element={<Order />} />
        <Route path="/help" element={<Help />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/product/:productId" element={<Product />} />
      </Route>
      <Route path="/admin" element={<AdminProducts />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}