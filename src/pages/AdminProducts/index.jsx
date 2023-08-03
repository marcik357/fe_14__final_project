import ProductList from "../../components/ProductList";
import { useCallback, useEffect, useState } from 'react';
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
import { setErrorAction } from "../../redux/actions/errorActions";
import { fetchData, loadData } from "../../utils";
import { reqGet, reqPut } from "../../utils/requestBody";

export function AdminProducts() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);

  const [openForm, setOpenForm] = useState(false);
  const [productId, setProductId] = useState(null)
  const products = useSelector((state) => state.products.products);
  const [product, setProduct] = useState(null)
  const [addProduct, setAddProduct] = useState(false)
  const modalType = useSelector((state) => state.modal.modal);

  async function deleteProduct(product) {
    const values = { ...product, enabled: false }
    try {
      await fetchData(`${baseUrl}products/${product._id}`, reqPut(JSON.stringify(values)));
      dispatch(setModalType('saved'))
    } catch (error) {
      dispatch(setErrorAction(error.message));
      dispatch(setModalType('error'))
    }

  }
  function handleDelButton(itemNo) {
    const product = products.find((product) => product.itemNo === itemNo)
    setProduct(product)
    dispatch(setModalType('deleteProduct'))
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

  const adminLoad = useCallback(async () => {
    const products = await fetchData(`${baseUrl}products`)
    dispatch(addProductsAction(products));
  }, [dispatch])

  const getProduct = useCallback(async () => {
    const product = await fetchData(`${baseUrl}products/${productId}`)
    setProduct(product);
  }, [productId])

  useEffect(() => {
    loadData(dispatch, adminLoad)
  }, [dispatch, adminLoad, productId])

  useEffect(() => {
    productId && getProduct();
  }, [getProduct, productId]);

  useEffect(() => {
    modalType
      ? document.body.style.overflow = 'hidden'
      : document.body.style.overflow = 'auto';
  }, [modalType, dispatch])

  return <>
    {modalType && (
      <Modal data={modalProps.find((modal) => modal.type === modalType)} onDelete={() => deleteProduct(product)} />
    )}
    <AdminHeader loggedIn={true} />
    <div className={style.admin}>
      <div className={style.admin__container}>
        {openForm && product
          ? <EditProductForm
            product={product}
            onCloseForm={handleFormClose} />
          : addProduct
            ? <AddProductForm onCloseForm={handleFormClose} />
            : <>
              <div className={style.admin__header}>
                <h1 className={style.admin__title}>Products</h1>
                <button className={style.admin__btn} type='button' onClick={handleAddButton}>Add new product</button>
              </div>
              <div className={`${style.admin__table} ${style.table}`}>
                <p className={style.table__cell}>Image</p>
                <p className={style.table__cell}>Name</p>
                <p className={style.table__cell}>Author</p>
                <p className={style.table__cell}>Quantity</p>
                <p className={style.table__cell}>Enabled</p>
                <p className={style.table__cell}>Price</p>
                <p className={style.table__cell}>Actions</p>
              </div>
              <ProductList
                products={products}
                customButtonText="Edit"
                customButtonHandler={handleEditButtonClick}
                adminCard={true}
                deleteButtonHandler={handleDelButton} />
            </>
        }
      </div>
    </div>
  </>
}