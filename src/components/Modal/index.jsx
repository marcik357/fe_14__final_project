import PropTypes from 'prop-types';
import style from './modal.module.scss';

export function Modal(props) {
  const {show, header, text, onClose, actions} = props;
  if (!show) {
    return null;
  }
  return (
    <>
      <div className={style.overlay} onClick={onClose}></div>
      <div className={style.modal}>
        <div className={style.modal__container}>
          <div className={style.modal__header}>
            <h3 className={style.modal__title}>{header}</h3>
            <button className={style.modal__closeBtn} onClick={onClose}>✖</button>
          </div>
          <div className={style.modal__text}>
            <p>{text}</p>
          </div>
          <div className={style.modal__btns}>
            {actions}
          </div>
        </div>
      </div>
    </>
  )
}

Modal.propTypes = {
    show: PropTypes.bool,
    header: PropTypes.string,
    text: PropTypes.string,
    onClose: PropTypes.func,
    actions: PropTypes.func,
};
