import style from './modal.module.scss';

export const modalProps = [
  {
    type: 'buy',
    text: 'This product will be added to your cart',
    closeBtnHandler(onClose, className) {
      return (
        <button onClick={onClose} className={className} />
      );
    },
    actions(onClose, onSubmit, className) {
      return (
        <div className={className}>
          <button type='button' onClick={onSubmit} className={`${style.modal__btn} ${style.submitBtn}`}>Ok</button>
          <button type='button' onClick={onClose} className={`${style.modal__btn} ${style.cancelBtn}`}>Cancel</button>
        </div>
      );
    },
  },
  {
    type: 'delete',
    text: 'This product will be removed from your cart',
    closeBtnHandler(onClose, className) {
      return (
        <button onClick={onClose} className={className} />
      );
    },
    actions(onClose, onSubmit, className) {
      return (
        <div className={className}>
          <button type='button' onClick={onSubmit} className={`${style.modal__btn} ${style.submitBtn}`}>Ok</button>
          <button type='button' onClick={onClose} className={`${style.modal__btn} ${style.cancelBtn}`}>Cancel</button>
        </div>
      );
    },
  }
];
