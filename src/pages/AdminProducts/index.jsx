import ProductList from "../../components/ProductList";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../utils/vars';
import { getDataAction } from '../../redux/actions/getDataActions';
import { addProductsAction } from '../../redux/actions/productsActions';
import EditProductForm from "../../components/EditProductForm";
import style from "./AdminProducts.module.scss"
import AddProductForm from "../../components/AddProductForm";
import AdminHeader from "../../components/AdminHeader";
import { setModalType } from "../../redux/actions/modalActions";
import { Modal } from "../../components/Modal";
import { modalProps } from '../../components/Modal/modalProps';

export function AdminProducts() {
  const dispatch = useDispatch();

  const [openForm, setOpenForm] = useState(false);
  const [productId, setProductId] = useState(null)
  const products = useSelector((state) => state.products.products);
  const [product, setProduct] = useState(null)
  const [addProduct, setAddProduct] = useState(false)
  const modalType = useSelector((state) => state.modal.modal);

function deleteProduct (id) {

}
function handleDelButton (){
  dispatch( setModalType('deleteProduct'))
}
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

  useEffect(() => {
    modalType
      ? document.body.style.overflow = 'hidden'
      : document.body.style.overflow = 'auto';
  }, [modalType, dispatch])

  return <>
  {modalType && (
        <Modal data={modalProps.find((modal) => modal.type === modalType)} />
      )}
  <AdminHeader/>
  <div className={style.container}>
    {openForm && product
      ? <EditProductForm product={product} onCloseForm={handleFormClose} />
      : addProduct ? (
        <AddProductForm onCloseForm={handleFormClose} />
      ) : <>
      <div className={style.btns}>
        <h1>Products</h1>
      <button className={style.addBtn} type='button' onClick={handleAddButton}>Add new product</button>
      </div>
      <div className={style.listHeader}>
        <p className={style.listHeader__img}>Image</p>
        <p className={style.listHeader__name}>Name</p>
        <p className={style.listHeader__author}>Author</p>
        <p>Quantity</p>
        <p>ItemNo</p>
        <p>Price</p>
        <p>Actions</p>
</div>
      <ProductList
        products={products}
        customButtonText="Edit"
        customButtonHandler={handleEditButtonClick}
        customCard={true}
        deleteButtonHandler={handleDelButton}/>
        </>
    }
  </div></>
}