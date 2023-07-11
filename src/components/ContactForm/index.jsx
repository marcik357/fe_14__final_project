import { useSelector } from "react-redux";
import styleText from '../../pages/Order/order.module.scss';
import FormikForm from "../FormikForm";
import { validationSchemaOrder } from "../../validation";

export function ContactForm ({contactForm,setActive,active,setContactValue}) {
    const customer =useSelector(state=> state.cart.cart.customerId);
    
    
    const handleSubmit=(value)=>{
        setActive(!active);
        setContactValue(value)
    }

    return (
        <>
        <FormikForm
        initialValues={
            {email: customer?.email,
            telephone:customer?.telephone}}
        fields={contactForm}
        validationSchema={validationSchemaOrder}
        submitBtn="Continue"
        callback={handleSubmit}
        />
        <h2 className={styleText.user_info__title}>Payment</h2>
        </>
    )
}