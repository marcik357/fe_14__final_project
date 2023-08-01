import { useField } from 'formik';

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label
       htmlFor={props.id}
       className={props.labelClass}>
       {label}
      </label>
      <select
        className={props.inputClass}
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        {...field}
        value={field.value || ''}
        multiple = {props.multiple}
      ><option value="" disabled>
      Choose from the list
    </option>
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className={props.errorClass}>{meta.error}</div>
      ) : null}
    </>
  );
};

export default Select;
