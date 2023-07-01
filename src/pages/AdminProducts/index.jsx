import ProductList from "../../components/ProductList";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../utils/vars';
import { getDataAction } from '../../redux/actions/getDataActions';
import { addProductsAction, addPromoAction } from '../../redux/actions/productsActions';


export function AdminProducts(){
  
  const [openForm, setOpenForm] = useState(false);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  function handleEditButtonClick() {
    setOpenForm(true);
  }
  useEffect(() => {
    dispatch(getDataAction(`${baseUrl}products`, addProductsAction));
  }, [dispatch]);
    return <> {openForm && <div> Form Open</div>}
    <ProductList
    products={products}
    customButtonText="Edit"
    customButtonHandler={handleEditButtonClick}/>
    </>
}