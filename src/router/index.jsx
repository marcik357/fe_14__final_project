import { Route, Routes } from 'react-router-dom';
import { MainLayout, Home, Cart, Categories, NotFound, Product, Blog, Author } from '../pages';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/product/:productId" element={<Product />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}