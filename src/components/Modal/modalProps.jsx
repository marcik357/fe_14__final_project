import { NavLink } from 'react-router-dom';
import { Success } from '../Icons/success-icon';
import style from './modal.module.scss';

export const modalProps = [
  {
    type: 'buy',
    header: 'Added to cart',
    icon: <Success />,
    actions(onClose, onSubmit, className) {
      return (
        <div className={className}>
          <button onClick={onSubmit} className={`${style.modal__btn} ${style.submitBtn}`}>Continue shopping</button>
          <NavLink to="/cart" onClick={onClose} className={`${style.modal__btn} ${style.cancelBtn}`}>
            View cart
          </NavLink>
        </div>
      );
    },
  },
  {
    type: 'delete',
    header: 'Are you sure?',
    text: 'Do you want to remove this from your cart?',
    actions(onClose, onSubmit, className) {
      return (
        <div className={className}>
          <button type='button' onClick={onSubmit} className={`${style.modal__btn} ${style.submitBtn}`}>Remove</button>
          <button type='button' onClick={onClose} className={`${style.modal__btn} ${style.cancelBtn}`}>Cancel</button>
        </div>
      );
    },
  }
];
