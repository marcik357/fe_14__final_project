import ProductList from "../ProductList";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../utils/vars';
import { getDataAction } from '../../redux/actions/getDataActions';
import EditProductForm from "../EditProductForm";
import style from "./AdminProducts.module.scss"
import { fetchData } from "../../utils";

export function AdminProducts() {
  const [openForm, setOpenForm] = useState(false);
  const products = useSelector((state) => state.products.products);
  const [product, setProduct] = useState(null)

  async function handleEditButtonClick(id) {
    const product = await fetchData(`${baseUrl}products/${id}`)
    setProduct(product)
    setOpenForm(true);
  }

  function handleFormClose() {
    setProduct(null);
    setOpenForm(false);
  }

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