import ProductList from "../../components/ProductList";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../utils/vars';
import EditProductForm from "../../components/EditProductForm";
import style from "./AdminProducts.module.scss"
import AddProductForm from "../../components/AddProductForm";
import Loader from "../../components/Loader";
import { fetchData, loadData } from "../../utils";
import { reqGet } from "../../utils/requestBody";
import { useCallback } from "react";

export function AdminProducts() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loading.loading);

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

  const productLoad = useCallback(async () => {
    if (productId) {
      const product = await fetchData(`${baseUrl}products/${productId}`, reqGet())
      setProduct(product)
    }
  }, [productId])

  useEffect(() => {
    loadData(dispatch, productLoad)
  }, [dispatch, productLoad]);

  if (loading) return <Loader />

  if (openForm && product) return <EditProductForm product={product} onCloseForm={handleFormClose} />

  if (addProduct) return <AddProductForm onCloseForm={handleFormClose} />

  return (
    <div className={style.container}>
      <div className={style.btns}>
        <button className={style.addBtn} type='button' onClick={handleAddButton}>Add new product</button>
      </div>
      <ProductList
        products={products}
        customButtonText="Edit"
        customButtonHandler={handleEditButtonClick} />
    </div>)

  // return (
  //   <div className={style.container}>
  //     {addProduct
  //         ? <AddProductForm onCloseForm={handleFormClose} />
  //         : <>
  //           <div className={style.btns}>
  //             <button className={style.addBtn} type='button' onClick={handleAddButton}>Add new product</button>
  //           </div>
  //           <ProductList
  //             products={products}
  //             customButtonText="Edit"
  //             customButtonHandler={handleEditButtonClick} />
  //         </>
  //     }
  //   </div>)

  // return (
  //   <div className={style.container}>
  //     {openForm && product
  //       ? <EditProductForm product={product} onCloseForm={handleFormClose} />
  //       : addProduct
  //         ? <AddProductForm onCloseForm={handleFormClose} />
  //         : <>
  //           <div className={style.btns}>
  //             <button className={style.addBtn} type='button' onClick={handleAddButton}>Add new product</button>
  //           </div>
  //           <ProductList
  //             products={products}
  //             customButtonText="Edit"
  //             customButtonHandler={handleEditButtonClick} />
  //         </>
  //     }
  //   </div>)
}