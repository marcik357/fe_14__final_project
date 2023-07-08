import styles from '../SignUpForm/signUpForm.module.scss';

export const paymentFormValue = [
    {
      tagType: 'regular',
      label: "Card number",
      labelClass: styles.form__label,
      inputClass: styles.form__input,
      errorClass: styles.form__error,
      id: "cardNumber",
      name: "cardNumber",
      type: "text",
      placeholder: "4149 5458 #### ####",
    },
    {
      tagType: 'regular',
      label: "M/Y",
      labelClass: styles.form__label,
      inputClass: styles.form__input,
      errorClass: styles.form__error,
      id: "monthYear",
      name: "monthYear",
      type: "text",
      placeholder: "Month/Year",
    },
    {
      tagType: 'regular',
      label: "CVV",
      labelClass: styles.form__label,
      inputClass: styles.form__input,
      errorClass: styles.form__error,
      id: "CVV",
      name: "CVV",
      type: "text",
      placeholder: "***",
    }
]