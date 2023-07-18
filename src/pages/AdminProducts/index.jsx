import ProductList from "../../components/ProductList";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../utils/vars';
import { getDataAction } from '../../redux/actions/getDataActions';
import { addProductsAction } from '../../redux/actions/productsActions';
import EditProductForm from "../../components/EditProductForm";
import style from "./AdminProducts.module.scss"
import AddProductForm from "../../components/AddProductForm";

export function AdminProducts() {
  const dispatch = useDispatch();

  const [openForm, setOpenForm] = useState(false);
  const [productId, setProductId] = useState(null)
  const products = useSelector((state) => state.products.products);
  const [product, setProduct] = useState(null)
  const [addProduct, setAddProduct] = useState(false)

  function handleAddButton() {
    setAddProduct(true)
  }
  function handleEditButtonClick(id) {
    setProductId(id)
    setOpenForm(true);
  }
  
  function handleFormClose() {
    setOpenForm(false);
    setProductId(null);
    setProduct(null);
    setAddProduct(false)
  }
  useEffect(() => {
    dispatch(getDataAction(`${baseUrl}products`, addProductsAction));
  }, [dispatch]);

  useEffect(() => {
    productId && dispatch(getDataAction(`${baseUrl}products/${productId}`, setProduct, {}, 'product'));
  }, [dispatch, productId, product]);

  return <div className={style.container}>
    {openForm && product
      ? <EditProductForm product={product} onCloseForm={handleFormClose} />
      : addProduct ? (
        <AddProductForm onCloseForm={handleFormClose} />
      ) : <>
      <div className={style.btns}>
      <button className={style.addBtn} type='button' onClick={handleAddButton}>Add new product</button>
      </div>
      <ProductList
        products={products}
        customButtonText="Edit"
        customButtonHandler={handleEditButtonClick} />
        </>
    }
  </div>
}