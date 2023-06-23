import {
  Route, Routes,
} from 'react-router-dom';
import {
  Cart
} from '../pages';

export default function Router() {
  return (
  
        <Route path="/cart" element={<Cart />} />
      
  );
}