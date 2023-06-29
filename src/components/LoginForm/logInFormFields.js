import style from "./loginForm.module.scss"
export const logInFormFields = [
    {
      tagType: 'regular',
      label: "Login or Email",
      labelClass: style.form__label,
      inputClass: style.form__input,
      errorClass: style.form__error,
      id: "loginOrEmail",
      name: "loginOrEmail",
      type: "text",
      placeholder: "Enter your login or email",
    },
    {
      tagType: 'regular',
      label: "Password",
      labelClass: style.form__label,
      inputClass: style.form__input,
      errorClass: style.form__error,
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
    }
  ];