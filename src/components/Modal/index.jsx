import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setModalType } from '../../redux/actions/modalActions';
import { setArtNumAction } from '../../redux/actions/artNumActions';
import style from './modal.module.scss';

export function Modal(props) {
  const dispatch = useDispatch();
  const { data: { type, header, text, actions, icon } } = props;

  function onCloseModal() {
    dispatch(setModalType(null));
    dispatch(setArtNumAction(null))
  }

  function onSubmitModal() {
    onCloseModal();
  }

  return (
    <>
      <div className={style.overlay} role="button" tabIndex={0} onClick={onCloseModal} onKeyDown={onCloseModal} />
      <div className={`${style.modal} ${style[type]}`}>
        <div className={style.modal__container}>
          <div className={style.modal__header}>
            <h3 className={style.modal__title}>{header}</h3>
            <button type="button" className={style.modal__closeBtn} onClick={onCloseModal}>✕</button>
          </div>
          <div className={style.modal__text}>
            <div className={style.modal__icon}>
              {icon}
            </div>
            {text && <p>{text}</p>}
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