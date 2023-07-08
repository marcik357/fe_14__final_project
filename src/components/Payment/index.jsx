import { Formik,Form } from "formik";
import Input from "../Input";
import { paymentFormValue } from "./inputFormFields";
import style from './index.module.scss';

export function PaymentForm() {
    return(
    <Formik>
        <Form className={style.formOfPayment}>
            { paymentFormValue.map( field =>(
            <Input key={field.name} {...field}/>
            ))}
        </Form>
    </Formik>
    )
}