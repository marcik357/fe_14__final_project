import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setModalType } from '../../redux/actions/modalActions';
import { setErrorAction } from '../../redux/actions/errorActions';
import style from './modal.module.scss';

export function Modal(props) {
  const dispatch = useDispatch();
  const { data: { type, header, text, actions, icon } } = props;
  const error = useSelector((state) => state.error.error)

  function onCloseModal() {
    dispatch(setModalType(null));
    dispatch(setErrorAction(null));
  }

  function onSubmitModal() {
    onCloseModal();
  }

  return (
    <>
      <div className={style.overlay} role="button" tabIndex={0} onClick={onCloseModal} onKeyDown={onCloseModal} />
      <div className={style.modal}>
        <div className={style.modal__container}>
          <div className={style.modal__header}>
            <h3 className={style.modal__title}>{header}</h3>
          </div>
          <div className={style.modal__text}>
            {icon && <div className={style.modal__icon}>
              {icon}
            </div>}
            {type !== 'buy' && <p>{text || error}</p>}
          </div>
          {actions && actions(onCloseModal, onSubmitModal, style.modal__btns)}
        </div>
      </div>
    </>
  );
}

Modal.defaultProps = {
  data: {
    type: '',
    header: '',
    text: '',
    actions: null,
  },
};

Modal.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    header: PropTypes.string,
    text: PropTypes.string,
    actions: PropTypes.func,
  }),
};