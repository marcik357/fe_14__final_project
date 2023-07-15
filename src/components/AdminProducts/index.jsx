import ProductList from "../ProductList";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../utils/vars';
import { getDataAction } from '../../redux/actions/getDataActions';
import EditProductForm from "../EditProductForm";
import style from "./AdminProducts.module.scss"
import { fetchData } from "../../utils";

export function AdminProducts() {
  const dispatch = useDispatch();
  // const loading = useSelector((state) => state.loading.loading);

  const [openForm, setOpenForm] = useState(false);
  // const [productId, setProductId] = useState(null)
  const products = useSelector((state) => state.products.products);
  const [product, setProduct] = useState(null)

  async function handleEditButtonClick(id) {
    // setProductId(id)
    const product = await fetchData(`${baseUrl}products/${id}`)
    setProduct(product)
    setOpenForm(true);
    // setProduct(products.find((product) => product.itemNo === id))
  }

  function handleFormClose() {
    // setProductId(null);
    setProduct(null);
    setOpenForm(false);
  }

  // useEffect(() => {
  //   dispatch(getDataAction(`${baseUrl}products`, addProductsAction));
  // }, [dispatch]);

  // useEffect(() => {
  //   productId && dispatch(getDataAction(`${baseUrl}products/${productId}`, setProduct, {}, 'product'));
  // }, [dispatch, productId]);

  return (
    <div className={style.admin}>
      <div className={style.admin__container}>
        {openForm && product
          ? <EditProductForm product={product} onCloseForm={handleFormClose} />
          : <ProductList
            products={products}
            customButtonText="Edit"
            customButtonHandler={handleEditButtonClick} />
        }
      </div>
    </div>
  )
}