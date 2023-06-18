import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SliderPromo from '../../components/SliderPromo';
import { getData } from '../../redux/actions/getDataActions';

export function Home() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getData('./data/productList.json'));
  }, []);
  const productsPromo = useSelector((state) => state.products.products);

  return (
    <div>
      Home
      {productsPromo.promo && <SliderPromo products={productsPromo.promo} type="promo" />}
    </div>
  );
}
