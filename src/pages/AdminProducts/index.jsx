import ProductList from "../../components/ProductList";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../utils/vars';
import { getDataAction } from '../../redux/actions/getDataActions';
import { addProductsAction } from '../../redux/actions/productsActions';
import EditProductForm from "../../components/EditProductForm";
import style from "./AdminProducts.module.scss"
import { fetchData } from "../../utils";
import Loader from "../../components/Loader";

export function AdminProducts() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);

  const [openForm, setOpenForm] = useState(false);
  const [productId, setProductId] = useState(null)
  const products = useSelector((state) => state.products.products);
  const [product, setProduct] = useState(null)

  function handleEditButtonClick(id) {
    setProductId(id)
    setOpenForm(true);
  }

  function handleFormClose() {
    setProductId(null);
    setProduct(null);
    setOpenForm(false);
  }

  // useEffect(() => {
  //   dispatch(getDataAction(`${baseUrl}products`, addProductsAction));
  // }, [dispatch]);

  useEffect(() => {
    productId && dispatch(getDataAction(`${baseUrl}products/${productId}`, setProduct, {}, 'product'));
  }, [dispatch, productId]);

  return (
    <div className={style.container}>
      {openForm && product
        ? <EditProductForm product={product} onCloseForm={handleFormClose} />
        : <ProductList
          products={products}
          customButtonText="Edit"
          customButtonHandler={handleEditButtonClick} />
      }
    </div>
  )
}