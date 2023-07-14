import { useSelector } from "react-redux";
import styleText from '../../pages/Order/order.module.scss';
import FormikForm from "../FormikForm";
import { validationSchemaOrder } from "../../validation";
import { useState, useEffect } from "react";
export function ContactForm({ contactForm, setActive, active, setContactValue }) {
  const customer = useSelector(state => state.cart.cart.customerId);
  // const loading = useSelector(state => state.loading);
  const token = useSelector(state => state.token.token);
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    telephone: ''
  })

  useEffect(() => {
    // (token && customer) &&
    // setInitialValues({
    //   ...initialValues,
    //   name: customer?.firstName,
    //   email: customer?.email,
    //   telephone: customer?.telephone})
    (token && customer) &&
      setInitialValues(
        initialValues.name = customer?.firstName,
        initialValues.email = customer?.email,
        initialValues.telephone = customer?.telephone)
  }, [customer, token])

  const handleSubmit = (value) => {
    setActive(!active);
    setContactValue(value)
  }

  return (
    <>
      <FormikForm
        initialValues={initialValues}
        fields={contactForm}
        validationSchema={validationSchemaOrder}
        submitBtn="Continue"
        callback={handleSubmit}
      />
      <h2 className={styleText.user_info__title}>Payment</h2>
    </>
  )
}