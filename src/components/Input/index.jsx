import { useField } from 'formik';

const Input = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label
                htmlFor={props.id || props.name}
                className={props.labelClass}>
                {label}
            </label>
            <input
                className={props.inputClass}
                type={props.type}
                placeholder={props.placeholder}
                {...field} />
            {meta.touched && meta.error
                ? <div
                    className={props.errorClass}>
                    {meta.error}
                </div>
                : null}
        </>
    )
}

export default Input