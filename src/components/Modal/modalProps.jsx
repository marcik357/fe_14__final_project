import { NavLink } from 'react-router-dom';
import { Success } from '../Icons/success-icon';
import { SuccessOrder } from '../Icons';
import { newOrder } from '../../utils/vars';
import style from './modal.module.scss';
import { MintModal } from '../MintModal';

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
  },
  {
    type: 'error',
    header: 'an error occurred',
    actions(onClose, onSubmit, className) {
      return (
        <div className={className}>
          <button type='button' onClick={onClose} className={`${style.modal__btn} ${style.cancelBtn}`}>OK</button>
        </div>
      );
    },
  },
  {
    type: 'login',
    header: 'you need to log in',
    text: 'Sorry, but for the sake of security, sometimes you need to log in again',
    actions(onClose, onSubmit, className) {
      return (
        <div className={className}>
          <NavLink to="/authorization" onClick={onClose} className={`${style.modal__btn} ${style.cancelBtn}`}>
            log in
          </NavLink>
        </div>
      );
    },
  },
  {
    type: 'registred',
    header: 'you have created an account',
    text: 'Now you need to login',
    actions(onClose, onSubmit, className) {
      return (
        <div className={className}>
          <NavLink to="/authorization" onClick={onClose} className={`${style.modal__btn} ${style.cancelBtn}`}>
            Ok
          </NavLink>
        </div>
      );
    },
  },
  {
    type: 'order',
    header: 'Thank you for the order!',
    icon:<SuccessOrder width='150px' />,
    actions(onClose, onSubmit, className) {
      return (
        <div className={className}>
          <NavLink to="/" onClick={onClose} className={`${style.modal__btn} ${style.cancelBtn}`}>
            Ok
          </NavLink>
        </div>
      );
    },
  },
  {
    type: 'mint',
    header: 'Select photo',
    icon:<MintModal />,
    actions(onClose, onSubmit, className) {
      return (
        <div className={className}>
            <button type='button' onClick={onClose} className={`${style.modal__btn} ${style.cancelBtn}`}>Close modal</button>
        </div>
      );
    },
  }
];
