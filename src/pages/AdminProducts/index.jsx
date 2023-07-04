import ProductList from "../../components/ProductList";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../utils/vars';
import { getDataAction } from '../../redux/actions/getDataActions';
import { addProductsAction} from '../../redux/actions/productsActions';
import { setArtNumAction } from "../../redux/actions/artNumActions";
import EditProductForm from "../../components/EditProductForm";

export function AdminProducts(){
  
  const [openForm, setOpenForm] = useState(false);
  const [productId, setProductId] = useState(null)
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const product = products.find((product) => product._id === productId)
  
  function handleEditButtonClick(dispatch, _id) {
    dispatch(setArtNumAction(_id))
    setProductId(_id)
    setOpenForm(true);
  }
  function handleFormClose() {
    setOpenForm(false);
  }
  useEffect(() => {
    dispatch(getDataAction(`${baseUrl}products`, addProductsAction));
  }, [dispatch]);

    return <>
    {openForm ?
    <EditProductForm product={product} onCloseForm={handleFormClose}/>
    : <ProductList
    products={products}
    customButtonText="Edit"
    customButtonHandler={(dispatch, _id) => handleEditButtonClick(dispatch, _id)}
    />}
    </>
}