import { useField } from 'formik';
import { PatternFormat } from "react-number-format";

const InputMasked = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={props.labelClass}>
        {label}
      </label>
      <PatternFormat
        className={props.inputClass}
        type={props.type}
        placeholder={props.placeholder}
        format={props.format}
        allowEmptyFormatting mask={props.mask}
        {...field} />
      {meta.touched && meta.error
        ? <div
          className={props.errorClass}>
          Повністю заповніть поле у заданому форматі
        </div>
        : null}
    </>
  )
}

export default InputMasked