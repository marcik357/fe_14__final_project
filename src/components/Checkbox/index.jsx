import { Field, useField } from "formik";

const Checkbox = ({ children, value, onChange, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <>
      <label
        htmlFor={children}
        className={props.labelclass}>
        <Field type={props.type}
          className={props.inputclass}
          id={children}
          name={props.name}
          value={children}
          />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className={props.errorclass}>{meta.error}</div>
      ) : null}
    </>
  );
};

export default Checkbox;