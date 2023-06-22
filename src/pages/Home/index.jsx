import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../redux/actions/getDataActions';
import SliderPromo from '../../components/SliderPromo';
import ProductList from '../../components/ProductList';

export function Home() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.loading.loading);
  // const error = useSelector((state) => state.error.error);

  useEffect(() => {
    dispatch(getData('./data/productList.json'));
  }, []);

  return (
    <div>
      {!loading
        ? (
          <>
            {products.promo && <SliderPromo products={products.promo} type="promo" />}
            <ProductList />
          </>
        )
        : <p>Loading...</p>}
    </div>
  );
}
