import { Route, Routes } from 'react-router-dom';
import { MainLayout, Home, Cart, Categories, NotFound, Product, Blog, Author, Authorization, AdminProducts } from '../pages';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/product/:productId" element={<Product />} />
      </Route>
      <Route path="/admin" element={<AdminProducts />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}