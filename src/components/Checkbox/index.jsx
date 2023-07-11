import { useField } from "formik";

const Checkbox = ({children, value, onChange, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    const handleCheckboxChange  = (event) => {
        const { name, checked } = event.target;
        if (checked) {
          onChange([...value, name]);
        } else {
          onChange(value.filter((val) => val !== name));
        }
      };
    return (
      <div>
        <label
        htmlFor={children}
        className={props.labelclass}>
          <input
        type={props.type}
        className={props.inputclass}
        id={children} {...props}
        checked={value.includes(children)}
        onChange={handleCheckboxChange }/>
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className={props.errorclass}>{meta.error}</div>
        ) : null}
      </div>
    );
  };

  export default Checkbox;